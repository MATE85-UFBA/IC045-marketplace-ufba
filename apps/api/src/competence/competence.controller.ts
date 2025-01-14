import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto } from './competence.dto';
import { UpdateCompetenceDto } from './competence.dto';
import { ResearchGroupService } from '@/research-group/research-group.service';

//TODO colocar os useGuard
@Controller('competence')
export class CompetenceController {
  constructor(
    private readonly competenceService: CompetenceService,
    private readonly researchGroupService: ResearchGroupService,
  ) {}

  @Get('/all')
  findAll() {
    return this.competenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenceService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.competenceService.delete(id);
  }

  @Post()
  async create(@Body() competence: CreateCompetenceDto) {
    const researchGroup = await this.researchGroupService.findOne(
      competence.researchGroupId,
    );

    if (!researchGroup) {
      throw new NotFoundException('Grupo de Pesquisa não existe');
    }

    return this.competenceService.create(competence);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() competence: UpdateCompetenceDto) {
    return this.competenceService.update(id, competence);
  }
}
