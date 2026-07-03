import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(StorageService.name);

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      this.logger.warn('Supabase URL ou Key manquante, le stockage risque de ne pas fonctionner.');
    }

    this.supabase = createClient(supabaseUrl || '', supabaseKey || '', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  /**
   * Upload un fichier vers Supabase Storage
   * @param fileBuffer Buffer du fichier
   * @param fileName Nom du fichier (ex: 1234-kyc.pdf)
   * @param bucketName Nom du bucket (ex: mbolopay-kyc)
   * @param mimeType Type MIME (ex: application/pdf)
   * @returns URL publique ou d'accès au fichier
   */
  async uploadFile(fileBuffer: Buffer, fileName: string, bucketName: string, mimeType: string): Promise<string> {
    const { data: buckets } = await this.supabase.storage.listBuckets();
    this.logger.log(`Tentative d'upload dans "${bucketName}". Buckets vus par l'API : ` + (buckets?.map(b => b.name).join(', ') || 'aucun'));

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      this.logger.error(`Erreur d'upload Supabase: ${error.message}`);
      throw new BadRequestException(`Upload échoué: ${error.message}`);
    }

    // Récupérer l'URL publique
    const { data: publicUrlData } = this.supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }
}
