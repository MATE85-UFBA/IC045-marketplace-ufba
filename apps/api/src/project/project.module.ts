import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  controllers: [ProjectController, PrismaService],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
