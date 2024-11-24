import { Module } from '@nestjs/common';
import { ResearchGroupService } from './research-group.service';
import { ResearchGroupController } from './research-group.controller';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  providers: [ResearchGroupService, PrismaService],
  controllers: [ResearchGroupController],
  exports: [ResearchGroupService],
})
export class ResearchGroupsModule {}
