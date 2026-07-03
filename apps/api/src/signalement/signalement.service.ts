import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SignalementService {
  constructor(private prisma: PrismaService) {}

  async create(data: { collecteId: string; reason: string }) {
    // Verify collecte exists
    const collecte = await this.prisma.collecte.findUnique({
      where: { id: data.collecteId },
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable');
    }

    return this.prisma.signalement.create({
      data: {
        collecteId: data.collecteId,
        reason: data.reason,
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.signalement.findMany({
      include: {
        collecte: { select: { title: true, slug: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    const signalement = await this.prisma.signalement.findUnique({ where: { id } });
    if (!signalement) throw new NotFoundException('Signalement introuvable');

    // If suspending, also update collecte status
    if (status === 'SUSPENDED') {
      await this.prisma.collecte.update({
        where: { id: signalement.collecteId },
        data: { status: 'REPORTED' },
      });
    }

    return this.prisma.signalement.update({
      where: { id },
      data: { status },
    });
  }
}
