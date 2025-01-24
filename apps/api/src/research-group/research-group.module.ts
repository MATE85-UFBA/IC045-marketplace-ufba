import { Module } from '@nestjs/common';
import { ResearchGroupService } from './research-group.service';
import { ResearchGroupController } from './research-group.controller';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchersService } from '@/researchers/researchers.service';
import { MailModule } from '@/mailsend/mail.module';

@Module({
  providers: [ResearchGroupService, PrismaService, ResearchersService],
  imports: [MailModule],
  controllers: [ResearchGroupController],
  exports: [ResearchGroupService],
})
export class ResearchGroupsModule {}
