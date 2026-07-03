import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);

  constructor(private prisma: PrismaService) {}

  async logActivity(userId: string, action: string, details?: string, ip?: string) {
    return this.prisma.activityLog.create({
      data: { userId, action, details, ip }
    });
  }

  async checkFraud(userId: string, currentIp: string, currentCity: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.lastLoginAt) return true;

    // Fraud Detection: Dakar -> Tokyo in 2 mins logic
    const timeDiff = (new Date().getTime() - user.lastLoginAt.getTime()) / (1000 * 60); // minutes
    
    if (user.lastLoginCity !== currentCity && timeDiff < 30) {
      this.logger.warn(`FRAUDE DÉTECTÉE: Utilisateur ${userId} s'est connecté à ${user.lastLoginCity} puis à ${currentCity} en ${Math.round(timeDiff)} mins.`);
      
      await this.logActivity(userId, 'FRAUD_ALERT', `Changement de ville suspect: ${user.lastLoginCity} -> ${currentCity} en ${Math.round(timeDiff)}m`, currentIp);
      
      throw new UnauthorizedException('Connexion inhabituelle détectée. Par mesure de sécurité, votre compte est temporairement restreint. Veuillez contacter le support.');
    }

    // Update last login info
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginIp: currentIp,
        lastLoginCity: currentCity,
        lastLoginAt: new Date()
      }
    });

    return true;
  }

  async getRecentActivity() {
     return this.prisma.activityLog.findMany({
       orderBy: { createdAt: 'desc' },
       take: 50,
       include: { user: { select: { firstName: true, lastName: true, phone: true } } }
     });
  }
}
