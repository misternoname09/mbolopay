import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Liste toutes les commissions avec pagination
   */
  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.commission.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          collecte: { select: { title: true, slug: true } },
          don: { select: { amountXof: true, donorName: true, anonymous: true } },
        },
      }),
      this.prisma.commission.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Statistiques globales des commissions pour le dashboard admin
   */
  async getStats() {
    // Total global
    const totalAggregate = await this.prisma.commission.aggregate({
      _sum: { amountXof: true },
      _count: { id: true },
    });

    // Par mois (30 derniers jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30DaysAggregate = await this.prisma.commission.aggregate({
      where: { createdAt: { gte: thirtyDaysAgo } },
      _sum: { amountXof: true },
      _count: { id: true },
    });

    // Top 5 collectes par commission générée
    const topCollectes = await this.prisma.commission.groupBy({
      by: ['collecteId'],
      _sum: { amountXof: true },
      _count: { id: true },
      orderBy: { _sum: { amountXof: 'desc' } },
      take: 5,
    });

    // Récupérer les titres des top collectes
    const topCollectesWithTitles = await Promise.all(
      topCollectes.map(async (item) => {
        const collecte = await this.prisma.collecte.findUnique({
          where: { id: item.collecteId },
          select: { title: true, slug: true },
        });
        return {
          collecteId: item.collecteId,
          title: collecte?.title,
          slug: collecte?.slug,
          totalCommissionXof: item._sum.amountXof,
          donCount: item._count.id,
        };
      })
    );

    return {
      global: {
        totalCommissionXof: totalAggregate._sum.amountXof ?? 0,
        totalDons: totalAggregate._count.id,
      },
      last30Days: {
        totalCommissionXof: last30DaysAggregate._sum.amountXof ?? 0,
        totalDons: last30DaysAggregate._count.id,
      },
      topCollectes: topCollectesWithTitles,
    };
  }

  /**
   * Commissions pour une collecte spécifique
   */
  async findByCollecte(collecteId: string) {
    return this.prisma.commission.findMany({
      where: { collecteId },
      orderBy: { createdAt: 'desc' },
      include: {
        don: { select: { amountXof: true, createdAt: true } },
      },
    });
  }
}
