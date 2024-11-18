import { Module } from '@nestjs/common';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UsersService } from '@/user/user.service';

@Module({
  imports: [],
  controllers: [DemandController],
  providers: [DemandService, PrismaService, UsersService],
  exports: [DemandService],
})
export class DemandModule {}
