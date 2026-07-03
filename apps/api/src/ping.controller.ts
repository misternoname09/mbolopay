import { Controller, Get, Param } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Controller('ping')
export class PingController {
  constructor(private prisma: PrismaService) {}

  @Get()
  ping() {
    return { status: 'ok', message: 'API Mbolo Pay is alive!' };
  }

  @Get('make-admin/:phone')
  async makeAdmin(@Param('phone') phone: string) {
    const user = await this.prisma.user.update({
      where: { phone: `+${phone.trim()}` }, // Accepts the phone without the + in the URL
      data: { role: 'ADMIN' }
    });
    return { success: true, message: `${user.phone} est maintenant Administrateur. Déconnectez-vous et reconnectez-vous pour voir le menu.` };
  }
}
