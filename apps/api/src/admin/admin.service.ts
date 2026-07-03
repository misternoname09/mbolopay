import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KycStatus, WithdrawalStatus, NotificationType, CollecteStatus } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async getStats() {
    const [totalUsers, totalCollectes, totalDons, totalCommissions, pendingWithdrawals, pendingSignalements] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.collecte.count(),
      this.prisma.don.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amountXof: true },
        _count: true,
      }),
      this.prisma.commission.aggregate({
        _sum: { amountXof: true },
      }),
      this.prisma.retrait.count({ where: { status: 'PENDING' } }),
      this.prisma.signalement.count({ where: { status: 'PENDING' } }),
    ]);

    return {
      totalUsers,
      totalCollectes,
      totalVolume: totalDons._sum.amountXof || 0,
      totalDonations: totalDons._count || 0,
      totalCommissions: totalCommissions._sum.amountXof || 0,
      pendingWithdrawals,
      pendingSignalements,
    };
  }

  async getAllUsers(params: { search?: string; page?: number; limit?: number } = {}) {
    const { search, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { phone: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          phone: true,
          firstName: true,
          lastName: true,
          role: true,
          isBlocked: true,
          kycStatus: true,
          kycUrl: true,
          createdAt: true,
          _count: { select: { collectes: true, dons: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total, page, totalPages: Math.ceil(total / limit) };
  }

  async toggleBlockUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    if (user.role === 'ADMIN') throw new ForbiddenException('Impossible de bloquer un administrateur');

    return this.prisma.user.update({
      where: { id: userId },
      data: { isBlocked: !user.isBlocked },
      select: { id: true, isBlocked: true }
    });
  }

  async getUserDetails(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        collectes: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, title: true, targetXof: true, collectedXof: true, status: true, createdAt: true }
        },
        dons: {
          orderBy: { createdAt: 'desc' },
          include: { collecte: { select: { title: true } } }
        },
        retraits: {
          orderBy: { createdAt: 'desc' },
          include: { collecte: { select: { title: true } } }
        }
      }
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async validateKyc(userId: string, status: KycStatus) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: status },
    });

    await this.notificationService.send(
      userId,
      NotificationType.EMAIL,
      'Statut KYC mis à jour',
      status === KycStatus.VERIFIED
        ? 'Félicitations ! Votre identité a été vérifiée. Vous pouvez maintenant retirer vos fonds.'
        : "Votre document d'identité a été rejeté. Veuillez en soumettre un nouveau.",
    );

    return user;
  }

  async getPendingWithdrawals() {
    return this.prisma.retrait.findMany({
      where: { status: WithdrawalStatus.PENDING },
      include: {
        user: { select: { phone: true, firstName: true, lastName: true } },
        collecte: { select: { title: true } },
      },
    });
  }

  async getAllWithdrawals(params: { status?: string; search?: string; page?: number; limit?: number }) {
    const { status, search, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status as WithdrawalStatus;
    }
    
    if (search) {
      where.user = {
        OR: [
          { phone: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const [withdrawals, total] = await Promise.all([
      this.prisma.retrait.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, phone: true } },
          collecte: { select: { title: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.retrait.count({ where }),
    ]);

    return { withdrawals, total, page, totalPages: Math.ceil(total / limit) || 1 };
  }

  async approveWithdrawal(retraitId: string) {
    const retrait = await this.prisma.retrait.update({
      where: { id: retraitId },
      data: {
        status: WithdrawalStatus.COMPLETED,
        processedAt: new Date(),
      },
    });

    await this.notificationService.send(
      retrait.userId,
      NotificationType.SMS,
      'Retrait validé',
      `Votre demande de retrait de ${retrait.amountXof} XOF a été validée et envoyée vers votre compte ${retrait.method}.`,
    );

    return retrait;
  }

  async rejectWithdrawal(retraitId: string) {
    const retrait = await this.prisma.retrait.update({
      where: { id: retraitId },
      data: { status: WithdrawalStatus.REJECTED },
    });

    await this.notificationService.send(
      retrait.userId,
      NotificationType.SMS,
      'Retrait rejeté',
      `Votre demande de retrait de ${retrait.amountXof} XOF a été rejetée. Contactez le support pour plus d'informations.`,
    );

    return retrait;
  }

  // ─── Admin collecte management ──────────────────────────────────────────────

  async getAllCollectes(params: { status?: string; search?: string; page?: number; limit?: number }) {
    const { status, search, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status as CollecteStatus;
    }
    
    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const [collectes, total] = await Promise.all([
      this.prisma.collecte.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, phone: true } },
          _count: { select: { dons: { where: { status: 'SUCCESS' } }, signalements: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.collecte.count({ where }),
    ]);

    return { collectes, total, page, totalPages: Math.ceil(total / limit) };
  }

  async validateCollecte(collecteId: string) {
    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { status: CollecteStatus.ACTIVE },
    });
  }

  async rejectCollecte(collecteId: string) {
    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { status: CollecteStatus.CLOSED },
    });
  }

  async toggleBadge(collecteId: string) {
    const collecte = await this.prisma.collecte.findUnique({ where: { id: collecteId } });
    if (!collecte) throw new Error('Collecte introuvable');

    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { verifiedBadge: !collecte.verifiedBadge },
    });
  }

  async getLogs() {
    return this.prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { user: { select: { firstName: true, lastName: true, phone: true } } },
    });
  }

  // ─── Charts & Settings ──────────────────────────────────────────────────────

  async getChartStats() {
    // 7 days ago
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 6);
    date7DaysAgo.setHours(0, 0, 0, 0);

    const collectes = await this.prisma.collecte.findMany({
      where: { createdAt: { gte: date7DaysAgo } },
      select: { createdAt: true }
    });

    const dons = await this.prisma.don.findMany({
      where: { status: 'SUCCESS', createdAt: { gte: date7DaysAgo } },
      select: { amountXof: true, createdAt: true }
    });

    // Group by Date (YYYY-MM-DD)
    const map = new Map<string, { date: string; collectes: number; volume: number }>();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(date7DaysAgo);
      d.setDate(d.getDate() + i);
      const str = d.toISOString().split('T')[0];
      map.set(str, { date: str, collectes: 0, volume: 0 });
    }

    for (const c of collectes) {
      const d = c.createdAt.toISOString().split('T')[0];
      if (map.has(d)) map.get(d)!.collectes += 1;
    }

    for (const d of dons) {
      const dt = d.createdAt.toISOString().split('T')[0];
      if (map.has(dt)) map.get(dt)!.volume += d.amountXof;
    }

    return Array.from(map.values());
  }

  async promoteToAdmin(userId: string, permissions: string[] = ['SUPER_ADMIN']) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: 'ADMIN', permissions },
      select: { id: true, role: true, permissions: true }
    });
  }

  async getSettings() {
    // @ts-ignore
    const settings = await this.prisma.setting.findMany();
    const result: Record<string, string> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }
    return result;
  }

  async updateSetting(key: string, value: string) {
    // @ts-ignore
    return this.prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  }
}
