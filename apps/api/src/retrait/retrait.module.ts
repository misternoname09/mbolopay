import { Module } from '@nestjs/common';
import { RetraitService } from './retrait.service';
import { RetraitController } from './retrait.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, NotificationModule],
  providers: [RetraitService],
  controllers: [RetraitController],
})
export class RetraitModule {}
