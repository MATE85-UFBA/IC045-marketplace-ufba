import { Module } from '@nestjs/common';
import { ResearchGroupsService } from './research-groups.service';
import { ResearchGroupsController } from './research-groups.controller';

@Module({
  providers: [ResearchGroupsService],
  controllers: [ResearchGroupsController]
})
export class ResearchGroupsModule {}
