import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  async send(userId: string, type: NotificationType, title: string, content: string) {
    // 1. Save to database for history
    try {
      await this.prisma.notification.create({
        data: {
          userId,
          type,
          title,
          content
        }
      });
    } catch (e) {
      this.logger.error("Failed to save notification to DB", e);
    }

    // 2. Real-world delivery
    if (type === NotificationType.SMS) {
      this.logger.log(`[SMS] Préparation de l'envoi à l'utilisateur ${userId}: ${content}`);
      
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user && user.phone) {
        // Formater le numéro (enlever le +)
        const toPhone = user.phone.replace('+', '');
        const apiKey = process.env.TERMII_API_KEY;
        const senderId = process.env.TERMII_SENDER_ID || 'MboloPay';

        if (apiKey) {
          try {
            const response = await fetch('https://api.ng.termii.com/api/sms/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: toPhone,
                from: senderId,
                sms: content,
                type: 'plain',
                channel: 'generic',
                api_key: apiKey,
              })
            });
            const result = await response.json();
            this.logger.log(`[SMS] Termii Response: ${JSON.stringify(result)}`);
          } catch (error) {
            this.logger.error(`[SMS] Erreur d'envoi via Termii:`, error);
          }
        } else {
          this.logger.warn(`[SMS] TERMII_API_KEY non définie. Envoi simulé pour ${toPhone}.`);
        }
      }
    } else if (type === NotificationType.EMAIL) {
      this.logger.log(`[EMAIL] Préparation de l'envoi à l'utilisateur ${userId}`);
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      
      if (user && user.email) {
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
        
        if (apiKey && apiKey.startsWith('re_')) {
          try {
            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                from: `Mbolo Pay <${fromEmail}>`,
                to: [user.email],
                subject: title,
                html: `<div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: white; padding: 20px; border-radius: 10px;">
                          <h2>${title}</h2>
                          <p>${content}</p>
                          <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 20px;" />
                          <p style="color: #666; font-size: 12px;">L'équipe Mbolo Pay</p>
                        </div>
                      </div>`
              })
            });
            const result = await response.json();
            this.logger.log(`[EMAIL] Resend Response: ${JSON.stringify(result)}`);
          } catch (error) {
            this.logger.error(`[EMAIL] Erreur d'envoi via Resend:`, error);
          }
        } else {
          this.logger.warn(`[EMAIL] RESEND_API_KEY non configurée. Envoi simulé pour ${user.email}. Contenu: ${content}`);
        }
      } else {
         this.logger.warn(`[EMAIL] Utilisateur ${userId} n'a pas d'adresse e-mail configurée.`);
      }
    } else if (type === 'WHATSAPP' as any) { // Cast as any temporarily to avoid TS errors until Prisma client is generated
      this.logger.log(`[WHATSAPP] Préparation de l'envoi à l'utilisateur ${userId}`);
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      
      if (user && user.phone) {
        const toPhone = user.phone.replace('+', '');
        const token = process.env.WHATSAPP_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_ID;
        
        if (token && phoneId && !token.includes('XXXX')) {
          try {
            const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: toPhone,
                type: 'text',
                text: { body: `*${title}*\n\n${content}` }
              })
            });
            const result = await response.json();
            this.logger.log(`[WHATSAPP] Meta Response: ${JSON.stringify(result)}`);
          } catch (error) {
            this.logger.error(`[WHATSAPP] Erreur d'envoi via Meta:`, error);
          }
        } else {
          this.logger.warn(`[WHATSAPP] Clés non configurées. Envoi simulé pour ${toPhone}. Contenu: ${content}`);
        }
      }
    }

    return true;
  }

  async getMyNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    });
  }
}
