import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, CollecteStatus } from '@prisma/client';

@Injectable()
export class CollecteService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { title: string; description: string; category: Category; targetXof: number; endDate: Date; photoUrl?: string }) {
    // Generate a unique slug
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Math.random().toString(36).substring(2, 8);
    
    return this.prisma.collecte.create({
      data: {
        userId,
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        targetXof: data.targetXof,
        endDate: data.endDate,
        photoUrl: data.photoUrl || null,
        status: CollecteStatus.ACTIVE,
      },
    });
  }

  async findAll(params: { search?: string; category?: string; page?: number; limit?: number }) {
    const { search, category, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: any = { status: CollecteStatus.ACTIVE };

    // Category filter
    if (category && category !== 'ALL') {
      where.category = category as Category;
    }

    // Search filter (title or description)
    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim(), mode: 'insensitive' } },
        { description: { contains: search.trim(), mode: 'insensitive' } },
      ];
    }

    const [collectes, total] = await Promise.all([
      this.prisma.collecte.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, phone: true } },
          _count: { select: { dons: { where: { status: 'SUCCESS' } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.collecte.count({ where }),
    ]);

    return {
      collectes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + collectes.length < total,
    };
  }

  async findEndingSoon(limit = 6) {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return this.prisma.collecte.findMany({
      where: {
        status: CollecteStatus.ACTIVE,
        endDate: {
          gte: now,
          lte: sevenDaysFromNow,
        },
      },
      include: {
        user: { select: { firstName: true, lastName: true } },
        _count: { select: { dons: { where: { status: 'SUCCESS' } } } },
      },
      orderBy: { endDate: 'asc' },
      take: limit,
    });
  }

  async findByUser(userId: string) {
    return this.prisma.collecte.findMany({
      where: { userId },
      include: {
        _count: { select: { dons: { where: { status: 'SUCCESS' } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const collecte = await this.prisma.collecte.findUnique({
      where: { slug },
      include: { 
        user: { select: { firstName: true, lastName: true, phone: true } },
        dons: { where: { status: 'SUCCESS' }, orderBy: { createdAt: 'desc' }, take: 20 },
        updates: { orderBy: { createdAt: 'desc' } },
        _count: { select: { dons: { where: { status: 'SUCCESS' } } } },
      },
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable');
    }

    return collecte;
  }

  async update(userId: string, collecteId: string, data: { title?: string; description?: string; endDate?: Date }) {
    const collecte = await this.prisma.collecte.findFirst({
      where: { id: collecteId, userId },
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable');
    }

    if (collecte.status === CollecteStatus.CLOSED) {
      throw new ForbiddenException('Impossible de modifier une collecte clôturée');
    }

    const updateData: any = {};
    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.endDate) {
      if (new Date(data.endDate) < new Date()) {
        throw new ForbiddenException('La date de fin doit être dans le futur');
      }
      updateData.endDate = data.endDate;
    }

    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: updateData,
    });
  }

  async close(userId: string, collecteId: string) {
    const collecte = await this.prisma.collecte.findFirst({
      where: { id: collecteId, userId },
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable');
    }

    if (collecte.status === CollecteStatus.CLOSED) {
      throw new ForbiddenException('Cette collecte est déjà clôturée');
    }

    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { status: CollecteStatus.CLOSED },
    });
  }

  async addUpdate(userId: string, collecteId: string, content: string) {
    const collecte = await this.prisma.collecte.findFirst({
      where: { id: collecteId, userId },
    });

    if (!collecte) {
      throw new NotFoundException('Collecte introuvable ou vous n\'êtes pas l\'auteur');
    }

    if (collecte.status === CollecteStatus.CLOSED) {
      throw new ForbiddenException('Impossible d\'ajouter une mise à jour sur une collecte clôturée');
    }

    return this.prisma.update.create({
      data: {
        collecteId,
        content,
      },
    });
  }

  // ─── Admin methods ──────────────────────────────────────────────────────────

  async findAllAdmin(params: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;
    const where: any = {};

    if (status) {
      where.status = status as CollecteStatus;
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

  async adminValidate(collecteId: string) {
    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { status: CollecteStatus.ACTIVE },
    });
  }

  async adminReject(collecteId: string) {
    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { status: CollecteStatus.CLOSED },
    });
  }

  async adminToggleBadge(collecteId: string) {
    const collecte = await this.prisma.collecte.findUnique({ where: { id: collecteId } });
    if (!collecte) throw new NotFoundException('Collecte introuvable');

    return this.prisma.collecte.update({
      where: { id: collecteId },
      data: { verifiedBadge: !collecte.verifiedBadge },
    });
  }
}
