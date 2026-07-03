import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, NotificationType } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class DonService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {}

  /**
   * Calcule la commission Mbolo Pay sur un don.
   * Taux configurable via COMMISSION_RATE (défaut: 4%)
   * Minimum configurable via COMMISSION_MIN_XOF (défaut: 0 XOF)
   */
  private async calculateCommission(amountXof: number): Promise<{ commissionXof: number; netAmountXof: number; rate: number }> {
    const rateSetting = await this.prisma.setting.findUnique({ where: { key: 'COMMISSION_RATE' } });
    const minSetting = await this.prisma.setting.findUnique({ where: { key: 'COMMISSION_MIN_XOF' } });

    const rate = rateSetting ? parseFloat(rateSetting.value) : parseFloat(process.env.COMMISSION_RATE || '0.04');
    const minCommission = minSetting ? parseInt(minSetting.value, 10) : parseInt(process.env.COMMISSION_MIN_XOF || '0', 10);
    
    const commissionXof = Math.max(minCommission, Math.round(amountXof * rate));
    const netAmountXof = amountXof; // The donor pays the commission, so the campaign gets the base amount
    return { commissionXof, netAmountXof, rate };
  }

  async getConfig() {
    const rateSetting = await this.prisma.setting.findUnique({ where: { key: 'COMMISSION_RATE' } });
    const minSetting = await this.prisma.setting.findUnique({ where: { key: 'COMMISSION_MIN_XOF' } });
    return {
      rate: rateSetting ? parseFloat(rateSetting.value) : parseFloat(process.env.COMMISSION_RATE || '0.04'),
      min: minSetting ? parseInt(minSetting.value, 10) : parseInt(process.env.COMMISSION_MIN_XOF || '0', 10)
    };
  }

  async initiateDonation(data: {
    collecteId: string;
    amountXof: number;
    anonymous: boolean;
    donorName?: string;
    userId?: string;
  }) {
    // 1. Verify the collecte exists
    const collecte = await this.prisma.collecte.findUnique({
      where: { id: data.collecteId }
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable');
    }

    // 2. Calculate the commission the donor has to pay
    const { commissionXof, netAmountXof } = await this.calculateCommission(data.amountXof);
    const totalAmountXof = data.amountXof + commissionXof;

    // 3. Create the Pending Donation in the database
    // amountXof = Total charged to donor. netAmountXof = Base amount.
    const don = await this.prisma.don.create({
      data: {
        collecteId: data.collecteId,
        userId: data.userId,
        amountXof: totalAmountXof,
        commissionXof: commissionXof,
        netAmountXof: netAmountXof,
        paymentMethod: 'paydunya',
        anonymous: data.anonymous,
        donorName: data.anonymous ? null : data.donorName,
        status: PaymentStatus.PENDING,
      }
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = process.env.API_URL || 'http://localhost:3003';

    // 4. Call PayDunya API to generate the invoice URL with the TOTAL amount
    const paydunyaPayload = {
      invoice: {
        total_amount: totalAmountXof,
        description: `Don pour la collecte: ${collecte.title}`
      },
      store: {
        name: 'Mbolo Pay'
      },
      custom_data: {
        transactionId: don.id
      },
      actions: {
        cancel_url: `${appUrl}/collecte/${collecte.slug}?status=cancelled`,
        return_url: `${appUrl}/collecte/${collecte.slug}?status=success`,
        callback_url: `${apiUrl}/dons/webhook/paydunya`
      }
    };

    try {
      const response = await fetch('https://app.paydunya.com/api/v1/checkout-invoice/create', {
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
        return {
          success: true,
          donId: don.id,
          paymentUrl: result.response_text
        };
      } else {
        console.error('PayDunya API Rejection (Production):', result.response_text);
        throw new Error(`PayDunya a rejeté la transaction: ${result.response_text}`);
      }
    } catch (error) {
      console.error('PayDunya Connection Error:', error);
      throw new InternalServerErrorException("Impossible d'initialiser le paiement sécurisé. Vérifiez vos clés API ou réessayez plus tard.");
    }
  }

  async verifyPayment(transactionId: string, status: string) {
    // This endpoint is called by PayDunya Webhook (IPN) or mock simulator
    const don = await this.prisma.don.findUnique({
      where: { id: transactionId },
      include: { collecte: true }
    });

    if (!don) throw new NotFoundException('Don introuvable');

    if (status === 'completed' && don.status !== PaymentStatus.SUCCESS) {
      // ─── Transaction atomique : tout réussit ou tout échoue ─────────────────
      await this.prisma.$transaction([
        // 1. Marquer le don comme SUCCESS
        this.prisma.don.update({
          where: { id: don.id },
          data: { status: PaymentStatus.SUCCESS }
        }),

        // 2. Créer l'enregistrement de commission
        this.prisma.commission.create({
          data: {
            donId: don.id,
            collecteId: don.collecteId,
            amountXof: don.commissionXof,
            rate: don.commissionXof / don.netAmountXof,
          }
        }),

        // 3. Incrémenter le montant NET collecté + le total des commissions
        this.prisma.collecte.update({
          where: { id: don.collecteId },
          data: {
            collectedXof: { increment: don.netAmountXof },
            totalCommissionXof: { increment: don.commissionXof },
          }
        }),
      ]);

      // 4. Notifier l'organisateur (montant NET reçu)
      await this.notificationService.send(
        don.collecte.userId,
        'WHATSAPP' as any,
        'Nouveau don reçu !',
        `Félicitations ! Vous avez reçu un don net de ${don.netAmountXof} XOF pour votre collecte "${don.collecte.title}".`
      );

      // 5. Notifier le donateur si connecté
      if (don.userId) {
        await this.notificationService.send(
          don.userId,
          NotificationType.EMAIL,
          'Merci pour votre don',
          `Votre don d'un montant total de ${don.amountXof} XOF (incluant ${don.commissionXof} XOF de frais) à la collecte "${don.collecte.title}" a bien été reçu. Merci pour votre générosité !`
        );
      }
    }

    return { success: true };
  }

  async getMyDonations(userId: string) {
    return this.prisma.don.findMany({
      where: { userId, status: 'SUCCESS' },
      include: { collecte: { select: { title: true, slug: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }
}
