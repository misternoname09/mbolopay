import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('admin/commissions')
@UseGuards(JwtAuthGuard, AdminGuard)
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  /**
   * GET /admin/commissions?page=1&limit=20
   * Liste paginée de toutes les commissions
   */
  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.commissionService.findAll(parseInt(page, 10), parseInt(limit, 10));
  }

  /**
   * GET /admin/commissions/stats
   * Statistiques globales (revenus totaux, 30 derniers jours, top collectes)
   */
  @Get('stats')
  getStats() {
    return this.commissionService.getStats();
  }

  /**
   * GET /admin/commissions/collecte/:collecteId
   * Toutes les commissions d'une cagnotte spécifique
   */
  @Get('collecte/:collecteId')
  findByCollecte(@Param('collecteId') collecteId: string) {
    return this.commissionService.findByCollecte(collecteId);
  }
}
