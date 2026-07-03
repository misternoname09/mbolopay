import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { RetraitService } from './retrait.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('retraits')
@UseGuards(JwtAuthGuard)
export class RetraitController {
  constructor(private readonly retraitService: RetraitService) {}

  @Post()
  async request(@CurrentUser() user: any, @Body() data: { collecteId: string; amountXof: number; method: string; phone: string }) {
    return this.retraitService.requestWithdrawal(user.id, data);
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.retraitService.getMyWithdrawals(user.id);
  }
}
