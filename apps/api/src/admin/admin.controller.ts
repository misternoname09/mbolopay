import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { KycStatus } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  async getUsers(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAllUsers({
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('users/:id')
  async getUserDetails(@Param('id') userId: string) {
    return this.adminService.getUserDetails(userId);
  }

  @Post('users/:id/toggle-block')
  async toggleBlockUser(@Param('id') userId: string) {
    return this.adminService.toggleBlockUser(userId);
  }

  @Post('users/:id/kyc')
  async validateKyc(@Param('id') userId: string, @Body('status') status: KycStatus) {
    return this.adminService.validateKyc(userId, status);
  }

  @Post('users/:id/promote')
  @RequirePermissions('SUPER_ADMIN')
  async promoteToAdmin(
    @Param('id') userId: string, 
    @Body('permissions') permissions?: string[]
  ) {
    return this.adminService.promoteToAdmin(userId, permissions);
  }

  // ─── Withdrawals ────────────────────────────────────────────────────────────

  @Get('retraits/pending')
  async getPendingWithdrawals() {
    return this.adminService.getPendingWithdrawals();
  }

  @Get('retraits')
  async getAllWithdrawals(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAllWithdrawals({
      status,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Post('retraits/:id/approve')
  async approveWithdrawal(@Param('id') retraitId: string) {
    return this.adminService.approveWithdrawal(retraitId);
  }

  @Post('retraits/:id/reject')
  async rejectWithdrawal(@Param('id') retraitId: string) {
    return this.adminService.rejectWithdrawal(retraitId);
  }

  // ─── Collectes management ──────────────────────────────────────────────────

  @Get('collectes')
  async getAllCollectes(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.adminService.getAllCollectes({
      status,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Post('collectes/:id/validate')
  async validateCollecte(@Param('id') collecteId: string) {
    return this.adminService.validateCollecte(collecteId);
  }

  @Post('collectes/:id/reject')
  async rejectCollecte(@Param('id') collecteId: string) {
    return this.adminService.rejectCollecte(collecteId);
  }

  @Post('collectes/:id/badge')
  async toggleBadge(@Param('id') collecteId: string) {
    return this.adminService.toggleBadge(collecteId);
  }

  // ─── Logs & Charts & Settings ──────────────────────────────────────────────

  @Get('logs')
  async getLogs() {
    return this.adminService.getLogs();
  }

  @Get('chart-stats')
  async getChartStats() {
    return this.adminService.getChartStats();
  }

  @Get('settings')
  async getSettings() {
    return this.adminService.getSettings();
  }

  @Post('settings')
  async updateSetting(@Body() body: { key: string; value: string }) {
    return this.adminService.updateSetting(body.key, body.value);
  }
}
