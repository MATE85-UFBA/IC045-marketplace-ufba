import { Module } from '@nestjs/common';
import { ResearchersController } from './researchers.controller';
import { ResearchersService } from './researchers.service';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  controllers: [ResearchersController],
  providers: [ResearchersService, PrismaService],
  exports: [ResearchersService],
})
export class ResearchersModule {}
