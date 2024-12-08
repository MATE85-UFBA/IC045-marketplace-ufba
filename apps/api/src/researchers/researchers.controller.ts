import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { FindResearcherDto } from './dtos/find-researcher.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('researcher')
export class ResearchersController {
  constructor(private researchService: ResearchersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/myresearchgroup')
  async myResearchGroups(@Request() req: { user: { userId: string } }) {
    //TODO desenvolver lógica para caso o grupo de pesquisa apareça na lista de líder, não apareça na de membro.
    return this.researchService.findOne(req.user.userId,true);
  }

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
