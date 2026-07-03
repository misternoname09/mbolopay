import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env before anything else
dotenv.config({ path: path.join(process.cwd(), '.env') });

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import helmet from 'helmet';
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Security: Global Validation Pipe (Strict Mode)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // supprime les champs non déclarés
    forbidNonWhitelisted: true, // rejette si champs non déclarés présents
    transform: true, // transforme les strings en types (int, boolean)
  }));
  
  // Security Header Hardening
  app.use(helmet());

  // GZIP Compression for ultra fast response
  app.use(compression());

  // Increase payload limit for Base64 images
  const express = require('express');
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  // Strict CORS for production (allow any in dev, but set headers)
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL || '*' : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  
  // Serve static files from the 'uploads' directory
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), { prefix: '/uploads/' });
  
  const port = process.env.PORT ?? 3003;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API Mbolo Pay prête sur: http://localhost:${port}`);
}
bootstrap();
