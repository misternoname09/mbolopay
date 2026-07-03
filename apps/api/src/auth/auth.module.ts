import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { SecurityService } from './security.service';
import { FirebaseService } from './firebase.service';
import { ThrottlerModule } from '@nestjs/throttler';

import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    StorageModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3,
    }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-mbollopay-key',
      signOptions: { expiresIn: '7d' }, // 7 days expiration for MVP
    }),
  ],
  providers: [AuthService, JwtStrategy, SecurityService, FirebaseService],
  controllers: [AuthController],
  exports: [AuthService, SecurityService, FirebaseService],
})
export class AuthModule {}
