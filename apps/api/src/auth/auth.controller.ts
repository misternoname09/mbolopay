import { Controller, Post, Get, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
    private readonly storageService: StorageService,
  ) {}

  @UseGuards(ThrottlerGuard)
  @Post('send-otp')
  async requestOtp(@Body('phone') phone: string) {
    return this.authService.requestOtp(phone);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phone') phone: string, @Body('code') code: string, @Body('referralCode') referralCode?: string) {
    return this.authService.verifyOtp(phone, code, referralCode);
  }

  @Post('firebase-login')
  async firebaseLogin(@Body('idToken') idToken: string, @Body('referralCode') referralCode?: string) {
    const decodedToken = await this.firebaseService.verifyIdToken(idToken);
    
    // Firebase returns phone in format +221770000000. 
    // We remove the '+' and the country code if it matches our format
    let phone = decodedToken.phone_number;
    if (phone && phone.startsWith('+221')) {
      phone = phone.replace('+221', '');
    } else if (phone && phone.startsWith('+')) {
      phone = phone.replace('+', '');
    }

    if (!phone) {
      throw new BadRequestException('Numéro de téléphone introuvable dans le token Google');
    }

    return this.authService.processVerifiedPhone(phone, referralCode);
  }

  @Post('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@CurrentUser() user: any, @Body() data: any) {
    return this.authService.updateUser(user.id, data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: any) {
    // Recharger l'utilisateur complet depuis la base de données pour avoir son statut KYC à jour
    const fullUser = await this.authService.getUser(user.id);
    return fullUser;
  }

  @Post('kyc-upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  }))
  async uploadKyc(@CurrentUser() user: any, @UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException("Aucun fichier reçu");
    }
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop() || 'pdf';
    const fileName = `${user.id}-${uniqueSuffix}.${ext}`;

    const kycUrl = await this.storageService.uploadFile(file.buffer, fileName, 'mbolopay-kyc', file.mimetype);
    return this.authService.updateUser(user.id, { kycUrl });
  }
}
