import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('transfers')
@UseGuards(JwtAuthGuard)
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('send')
  async sendMoney(@CurrentUser() user: any, @Body() data: { phone: string; amount: number; reason?: string }) {
    return this.transferService.sendMoney(user.id, data.phone, data.amount, data.reason);
  }

  @Get('history')
  async getHistory(@CurrentUser() user: any) {
    return this.transferService.getMyTransfers(user.id);
  }
}
