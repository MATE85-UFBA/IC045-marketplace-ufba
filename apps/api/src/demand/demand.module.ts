import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  imports: [],
  controllers: [DemandController],
  providers: [DemandService, PrismaService],
  exports: [DemandService],
})
export class DemandModule {}
