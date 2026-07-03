import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('signalements')
export class SignalementController {
  constructor(private readonly signalementService: SignalementService) {}

  // Public — anyone can report a collecte
  @Post()
  async create(@Body() data: { collecteId: string; reason: string }) {
    return this.signalementService.create(data);
  }

  // Admin — list all signalements
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll() {
    return this.signalementService.findAll();
  }

  // Admin — update signalement status
  @Post(':id/action')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.signalementService.updateStatus(id, status);
  }
}
