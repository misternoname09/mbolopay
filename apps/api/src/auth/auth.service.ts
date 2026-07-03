import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from './security.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {}

  // Mocking Redis for OTP storage
  private otps = new Map<string, { code: string, expires: number }>();

  async requestOtp(phone: string) {
    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    this.otps.set(phone, { code, expires });

    console.log(`[OTP] For ${phone}: ${code}`);
    
    // Send via WhatsApp
    let toPhone = phone.replace('+', '');
    // S'assurer que le code pays est présent (ex: pour le Sénégal)
    if (toPhone.length === 9) {
      toPhone = '221' + toPhone;
    }
    
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    
    // TENTATIVE 1: WHATSAPP
    if (token && phoneId && !token.includes('XXXX')) {
      try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: toPhone,
            type: 'text',
            text: { body: `*Mbolo Pay - Sécurité*\n\nVotre code de connexion est : *${code}*\n\nNe partagez jamais ce code. Il expire dans 5 minutes.` }
          })
        });
        const result = await response.json();
        console.log(`[WHATSAPP OTP] Meta Response: ${JSON.stringify(result)}`);
      } catch (error) {
        console.error(`[WHATSAPP OTP] Erreur d'envoi:`, error);
      }
    } else {
      console.warn(`[WHATSAPP OTP] Clés non configurées. Envoi simulé pour ${toPhone}. Code: ${code}`);
    }

    // TENTATIVE 2: FALLBACK EMAIL (RESEND)
    try {
      // Vérifier si l'utilisateur existe
      const user = await this.prisma.user.findUnique({
        where: { phone: phone }
      });

      // L'e-mail est envoyé UNIQUEMENT si l'utilisateur est un ADMIN (en base) OU si c'est l'un des numéros définis dans le .env
      const adminPhonesStr = process.env.ADMIN_PHONE;
      const isRegisteredAdmin = user && user.role === 'ADMIN';
      
      let isEnvAdmin = false;
      if (adminPhonesStr) {
        // Gère les numéros séparés par des virgules (ex: 787956265,781210104)
        isEnvAdmin = adminPhonesStr.split(',').some(p => phone.includes(p.trim()));
      }

      if (isRegisteredAdmin || isEnvAdmin) {
        const targetEmail = (user && user.email) ? user.email : process.env.ADMIN_FALLBACK_EMAIL;
        const resendApiKey = process.env.RESEND_API_KEY;

        if (targetEmail && resendApiKey && resendApiKey.startsWith('re_')) {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
              from: 'Mbolo Pay <onboarding@resend.dev>',
              to: [targetEmail],
              subject: 'Votre code de sécurité Mbolo Pay',
              html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9;">
                  <div style="background-color: white; padding: 20px; border-radius: 10px; text-align: center;">
                    <h2>Mbolo Pay - Sécurité</h2>
                    <p>Voici votre code de connexion sécurisé :</p>
                    <h1 style="color: #10B981; font-size: 32px; letter-spacing: 4px;">${code}</h1>
                    <p style="color: #666; font-size: 14px;">Ne partagez jamais ce code. Il expire dans 5 minutes.</p>
                  </div>
                </div>
              `
            })
          });
          
          const emailResult = await emailResponse.json();
          console.log(`[EMAIL OTP] Resend Response pour ADMIN (${targetEmail}): ${JSON.stringify(emailResult)}`);
        } else {
          console.log(`[EMAIL OTP] Clé RESEND_API_KEY non configurée ou aucun e-mail défini pour l'Admin.`);
        }
      } else if (user && user.role !== 'ADMIN') {
        console.log(`[EMAIL OTP] Utilisateur non-admin (${phone}). L'e-mail n'est pas envoyé.`);
      } else if (!user) {
        console.log(`[EMAIL OTP] Utilisateur inconnu (${phone}). L'e-mail n'est pas envoyé.`);
      }
    } catch (emailError) {
      console.error(`[EMAIL OTP] Erreur fatale:`, emailError);
    }

    return { message: 'OTP envoyé avec succès' };
  }

  async verifyOtp(phone: string, otp: string, referralCode?: string) {
    const record = this.otps.get(phone);

    if (!record || record.code !== otp || Date.now() > record.expires) {
      throw new UnauthorizedException('Code OTP invalide ou expiré');
    }

    this.otps.delete(phone);

    return this.processVerifiedPhone(phone, referralCode);
  }

  async processVerifiedPhone(phone: string, referralCode?: string) {
    // 3. User already exists?
    let user = await this.prisma.user.findUnique({
      where: { phone: phone }
    });

    if (!user) {
      // Generate unique referral code for this new user
      const newReferralCode = `MB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // First time registration
      user = await this.prisma.user.create({
        data: { 
          phone,
          referralCode: newReferralCode,
          // Connect to referrer if a referral code was provided at signup
          referredBy: referralCode ? {
            connect: { referralCode: referralCode }
          } : undefined
        }
      });

      // Reward the referrer
      if (user.referredById) {
        await this.prisma.user.update({
          where: { id: user.referredById },
          data: { points: { increment: 500 } } // 500 points for referral
        });
        await this.securityService.logActivity(user.referredById, 'REFERRAL_REWARD', 'Récompense de parrainage reçue');
      }
    }

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    
    // 4. Fraud Check & Activity Log
    const mockIp = "192.168.1.1";
    const mockCity = "Dakar"; 
    await this.securityService.checkFraud(user.id, mockIp, mockCity);
    await this.securityService.logActivity(user.id, 'LOGIN_SUCCESS', 'Connexion réussie', mockIp);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
    };
  }

  async updateUser(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        kycUrl: data.kycUrl,
        kycStatus: data.kycUrl ? 'PENDING' : undefined
      }
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    });
  }
}
