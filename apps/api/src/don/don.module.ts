import { Module } from '@nestjs/common';
import { DonService } from './don.service';
import { DonController } from './don.controller';

@Module({
  providers: [DonService],
  controllers: [DonController],
})
export class DonModule {}
