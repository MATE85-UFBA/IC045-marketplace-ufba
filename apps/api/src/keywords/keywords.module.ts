import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  controllers: [KeywordsController],
  providers: [KeywordsService, PrismaService],
  exports: [KeywordsService],
})
export class KeywordsModule {}
