import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StorageService } from './storage.service';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('upload')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }))
  async uploadImage(@CurrentUser() user: any, @UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException("Aucun fichier reçu");
    }

    // Sécuriser le type de fichier
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException("Seules les images sont autorisées");
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop() || 'png';
    const fileName = `${user.id}-${uniqueSuffix}.${ext}`;

    const url = await this.storageService.uploadFile(file.buffer, fileName, 'mbolopay-public', file.mimetype);
    return { url };
  }
}
