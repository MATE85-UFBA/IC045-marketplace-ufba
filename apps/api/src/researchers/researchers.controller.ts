import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { FindResearcherDto } from './dtos/find-researcher.dto';

@Controller('researcher')
export class ResearchersController {
  constructor(private researchService: ResearchersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: FindResearcherDto) {
    const includeGroups = query.includeGroups ?? 'true';
    const includeGroupsFlag = this.stringToBoolean(includeGroups);
    return await this.researchService.findOne(id, includeGroupsFlag);
  }

  private stringToBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
  }
}
