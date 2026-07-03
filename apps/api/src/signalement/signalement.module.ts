import { Module } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { SignalementController } from './signalement.controller';

@Module({
  providers: [SignalementService],
  controllers: [SignalementController],
  exports: [SignalementService],
})
export class SignalementModule {}
