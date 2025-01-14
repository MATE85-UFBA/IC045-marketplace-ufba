import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchGroupService } from '@/research-group/research-group.service';

@Module({
  controllers: [CompetenceController],
  providers: [CompetenceService, PrismaService, ResearchGroupService],
  exports: [CompetenceService],
})
export class CompetenceModule {}
