import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserService } from '@/user/user.service';

@Module({
  imports: [],
  controllers: [DemandController],
  providers: [DemandService, PrismaService, UserService],
  exports: [DemandService],
})
export class DemandModule {}
