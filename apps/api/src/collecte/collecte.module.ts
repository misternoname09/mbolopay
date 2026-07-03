import { Module } from '@nestjs/common';
import { CollecteService } from './collecte.service';
import { CollecteController } from './collecte.controller';

@Module({
  providers: [CollecteService],
  controllers: [CollecteController],
})
export class CollecteModule {}
