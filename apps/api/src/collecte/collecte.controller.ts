import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CollecteService } from './collecte.service';
import { Category } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('collectes')
export class CollecteController {
  constructor(private readonly collecteService: CollecteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() data: { title: string; description: string; category: Category; targetXof: number; endDate: string; photoUrl?: string },
    @CurrentUser() user: any,
  ) {
    return this.collecteService.create(user.id, {
      ...data,
      endDate: new Date(data.endDate),
    });
  }

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.collecteService.findAll({
      search,
      category,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('ending-soon')
  async findEndingSoon(@Query('limit') limit?: string) {
    return this.collecteService.findEndingSoon(limit ? parseInt(limit, 10) : 6);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMyCollectes(@CurrentUser() user: any) {
    return this.collecteService.findByUser(user.id);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.collecteService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() data: { title?: string; description?: string; endDate?: string },
  ) {
    return this.collecteService.update(user.id, id, {
      ...data,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });
  }

  @Post(':id/close')
  @UseGuards(JwtAuthGuard)
  async close(@Param('id') id: string, @CurrentUser() user: any) {
    return this.collecteService.close(user.id, id);
  }

  @Post(':id/updates')
  @UseGuards(JwtAuthGuard)
  async addUpdate(@Param('id') id: string, @Body('content') content: string, @CurrentUser() user: any) {
    return this.collecteService.addUpdate(user.id, id, content);
  }
}
