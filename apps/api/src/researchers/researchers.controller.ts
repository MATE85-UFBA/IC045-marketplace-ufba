import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResearchersService } from './researchers.service';
import { FindResearcherDto } from './dtos/find-researcher.dto';
import { JwtAuthGuard } from '@/auth/auth.guard';

@Controller('researcher')
export class ResearchersController {
  constructor(private researchService: ResearchersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/myresearchgroup')
  async myResearchGroups(
    @Request() req: { user: { userId: string } },
    @Query('search') search: string,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.researchService.myResearchGroups(
      req.user.userId,
      true,
      search,
      order,
    );
  }

  @Get('/all')
  findAll() {
    return this.researchService.findAll();
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
