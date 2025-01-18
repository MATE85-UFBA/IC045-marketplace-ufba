import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MailModule } from '@/mailsend/mail.module';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
  imports: [MailModule],
})
export class CompanyModule {}
