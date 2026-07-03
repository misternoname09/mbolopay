import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { SecurityService } from '../auth/security.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class TransferService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
    private securityService: SecurityService
  ) {}

  async sendMoney(senderId: string, receiverPhone: string, amount: number, reason?: string) {
    // 1. Find receiver
    const receiver = await this.prisma.user.findUnique({
      where: { phone: receiverPhone }
    });

    if (!receiver) {
      throw new NotFoundException('Destinataire introuvable. Assurez-vous que le numéro est inscrit sur Mbolo Pay.');
    }

    if (senderId === receiver.id) {
      throw new BadRequestException('Vous ne pouvez pas vous envoyer de l\'argent à vous-même.');
    }

    return this.prisma.$transaction(async (tx) => {
      const transfer = await tx.transfer.create({
        data: {
          senderId,
          receiverId: receiver.id,
          amountXof: amount,
          reason
        }
      });

      // 2. Reward the sender (Cashback logic: 1 point per 1000 XOF)
      const pointsToEarn = Math.floor(amount / 1000);
      if (pointsToEarn > 0) {
        await tx.user.update({
          where: { id: senderId },
          data: { points: { increment: pointsToEarn } }
        });
        await this.securityService.logActivity(senderId, 'CASHBACK_REWARD', `Gain de ${pointsToEarn} points via transfert`);
      }

      // 3. Notify Receiver (SMS)
      await this.notificationService.send(
        receiver.id,
        NotificationType.SMS,
        'Argent reçu !',
        `Vous avez reçu ${amount} XOF de la part de l'utilisateur ${senderId.substring(0, 5)}.`
      );

      // 4. Notify Sender (Email)
      await this.notificationService.send(
        senderId,
        NotificationType.EMAIL,
        'Transfert réussi',
        `Votre transfert de ${amount} XOF vers le numéro ${receiverPhone} a bien été effectué.`
      );

      return transfer;
    });
  }

  async getMyTransfers(userId: string) {
    return this.prisma.transfer.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { phone: true, firstName: true } },
        receiver: { select: { phone: true, firstName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
