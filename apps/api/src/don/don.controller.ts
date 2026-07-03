import { Controller, Post, Body, HttpCode, Get, UseGuards, ForbiddenException } from '@nestjs/common';
import { DonService } from './don.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import * as crypto from 'crypto';

@Controller('dons')
export class DonController {
  constructor(private readonly donService: DonService) {}

  @Post('initiate')
  async initiateDonation(@Body() data: { collecteId: string; amountXof: number; anonymous: boolean; donorName?: string; userId?: string }) {
    return this.donService.initiateDonation(data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyDonations(@CurrentUser() user: any) {
    return this.donService.getMyDonations(user.id);
  }

  @Get('config')
  async getConfig() {
    return this.donService.getConfig();
  }

  // Webhook for PayDunya IPN
  @Post('webhook/paydunya')
  @HttpCode(200)
  async paydunyaWebhook(@Body() body: any) {
    // 🛡️ SÉCURITÉ ABSOLUE : Vérification cryptographique de la signature PayDunya (IPN)
    const masterKey = process.env.PAYDUNYA_MASTER_KEY;
    
    if (!masterKey) {
      console.error("ALERTE CRITIQUE : PAYDUNYA_MASTER_KEY manquant dans les variables d'environnement.");
      throw new ForbiddenException("Configuration serveur invalide");
    }

    const expectedHash = crypto.createHash('sha512').update(masterKey).digest('hex');
    const receivedHash = body.hash;

    if (!receivedHash || receivedHash !== expectedHash) {
      console.error(`🔴 ALERTE SÉCURITÉ : Tentative de fraude détectée ! Hash reçu invalide. IPN rejeté.`);
      throw new ForbiddenException('Signature de sécurité invalide.');
    }

    // Si le hash est valide, nous traitons la transaction en toute sécurité
    const transactionId = body.transaction_id || body.custom_data?.transactionId;
    const status = body.status; // 'completed', 'failed', 'pending'

    if (transactionId && status) {
      try {
        await this.donService.verifyPayment(transactionId, status);
      } catch (error) {
        console.error("Erreur critique traitement transaction PayDunya:", error);
      }
    }

    return { received: true };
  }
}
