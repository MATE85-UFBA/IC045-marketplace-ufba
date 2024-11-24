import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchGroupService } from '@/research-group/research-group.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, ResearchGroupService],
  exports: [ProjectService],
})
export class ProjectModule {}
