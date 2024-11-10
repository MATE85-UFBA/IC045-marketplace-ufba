import { Module } from '@nestjs/common';
import { ResearchGroupsService } from './research-group.service';
import { ResearchGroupsController } from './research-group.controller';

@Module({
  providers: [ResearchGroupsService],
  controllers: [ResearchGroupsController]
})
export class ResearchGroupsModule {}
