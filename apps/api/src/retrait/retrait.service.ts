import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WithdrawalStatus, NotificationType } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class RetraitService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  async requestWithdrawal(userId: string, data: { collecteId: string; amountXof: number; method: string; phone: string }) {
    // 0. Verify the user's KYC status
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.kycStatus !== 'VERIFIED') {
      throw new BadRequestException("Votre identité doit être vérifiée (KYC) pour effectuer un retrait.");
    }

    // 1. Verify the collecte belongs to the user
    const collecte = await this.prisma.collecte.findFirst({
      where: { id: data.collecteId, userId }
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable ou non autorisée');
    }

    // 2. Calculate available balance (collected - already withdrawn)
    const existingWithdrawals = await this.prisma.retrait.findMany({
      where: { 
        collecteId: data.collecteId,
        status: { in: [WithdrawalStatus.PENDING, WithdrawalStatus.COMPLETED] }
      }
    });

    const totalWithdrawn = existingWithdrawals.reduce((sum, r) => sum + r.amountXof, 0);
    const availableBalance = collecte.collectedXof - totalWithdrawn;

    if (data.amountXof > availableBalance) {
      throw new BadRequestException(`Solde insuffisant. Disponible: ${availableBalance} XOF`);
    }

    if (data.amountXof < 1000) {
      throw new BadRequestException('Le montant minimum de retrait est de 1000 XOF');
    }

    // 3. Create the withdrawal request (initially PENDING)
    const retrait = await this.prisma.retrait.create({
      data: {
        userId,
        collecteId: data.collecteId,
        amountXof: data.amountXof,
        method: data.method,
        status: WithdrawalStatus.PENDING
      }
    });

    // 4. Try automated payout (B2C via PayDunya)
    try {
      const paydunyaPayload = {
        account_alias: data.phone,
        amount: data.amountXof,
        withdraw_mode: data.method.toLowerCase(),
      };

      const response = await fetch('https://app.paydunya.com/api/v1/disburse/get-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYDUNYA-MASTER-KEY': process.env.PAYDUNYA_MASTER_KEY || '',
          'PAYDUNYA-PRIVATE-KEY': process.env.PAYDUNYA_PRIVATE_KEY || '',
          'PAYDUNYA-TOKEN': process.env.PAYDUNYA_TOKEN || ''
        },
        body: JSON.stringify(paydunyaPayload)
      });

      const result = await response.json();

      if (result.response_code === '00') {
        // Success real API
        await this.prisma.retrait.update({
          where: { id: retrait.id },
          data: { status: WithdrawalStatus.COMPLETED }
        });
      } else {
        console.error('PayDunya B2C API Rejection (Production):', result.response_text);
        await this.prisma.retrait.update({
          where: { id: retrait.id },
          data: { status: WithdrawalStatus.REJECTED }
        });
        throw new BadRequestException(`Retrait refusé par le partenaire financier: ${result.response_text}`);
      }
    } catch (error) {
      console.error('PayDunya Connection Error:', error);
      throw new InternalServerErrorException("Impossible de traiter le retrait actuellement. Veuillez vérifier vos numéros ou réessayer plus tard.");
    }

    // 5. Notify User via SMS & WhatsApp logic using NotificationService
    await this.notificationService.send(
      userId,
      NotificationType.SMS,
      'Retrait Effectué',
      `Mbolo Pay: Votre retrait de ${data.amountXof} XOF vers votre compte ${data.method} (${data.phone}) a été exécuté et est en cours de traitement par l'opérateur.`
    );

    return retrait;
  }

  async getMyWithdrawals(userId: string) {
    return this.prisma.retrait.findMany({
      where: { userId },
      include: { collecte: { select: { title: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }
}
