import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CollecteModule } from './collecte/collecte.module';
import { DonModule } from './don/don.module';
import { RetraitModule } from './retrait/retrait.module';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { TransferModule } from './transfer/transfer.module';
import { CommissionModule } from './commission/commission.module';
import { SignalementModule } from './signalement/signalement.module';
import { StorageModule } from './storage/storage.module';
import { PingController } from './ping.controller';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    // Rate Limiting (Anti-DDoS / Brute Force)
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requêtes par minute max par IP
    }]),
    // Cache en mémoire (Performance)
    CacheModule.register({
      isGlobal: true,
      ttl: 10000, // Les données sont gardées 10s en RAM
      max: 100, // Nombre max de requêtes gardées en mémoire
    }),
    PrismaModule,
    AuthModule,
    CollecteModule,
    DonModule,
    RetraitModule,
    AdminModule,
    NotificationModule,
    TransferModule,
    CommissionModule,
    SignalementModule,
    StorageModule,
    AiModule,
  ],
  controllers: [AppController, PingController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
