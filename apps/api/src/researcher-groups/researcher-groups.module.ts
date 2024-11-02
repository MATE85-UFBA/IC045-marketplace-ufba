import { Module } from '@nestjs/common';
import { ResearcherGroupsService } from './researcher-groups.service';
import { ResearcherGroupsController } from './researcher-groups.controller';

@Module({
  providers: [ResearcherGroupsService],
  controllers: [ResearcherGroupsController]
})
export class ResearcherGroupsModule {}
