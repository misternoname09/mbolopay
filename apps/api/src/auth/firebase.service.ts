import { Injectable, UnauthorizedException } from '@nestjs/common';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  constructor() {
    if (!getApps().length) {
      try {
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Permet de gérer les retours à la ligne dans la clé privée contenue dans le .env
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      } catch (error) {
        console.error('Erreur initialisation Firebase Admin', error);
      }
    }
  }

  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Firebase Token verification failed', error);
      throw new UnauthorizedException('Token Firebase invalide');
    }
  }
}
