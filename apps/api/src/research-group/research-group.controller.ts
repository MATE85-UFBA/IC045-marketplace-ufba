import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ResearchGroupService } from './research-group.service';
import {
  CreateResearchGroupDto,
  UpdateResearchGroupDto,
} from './research-group.dto';
import { ResearchersService } from '@/researchers/researchers.service';

//TODO colocar os useGuard
@Controller('researchgroup')
export class ResearchGroupController {
  constructor(
    private readonly researchGroupsService: ResearchGroupService,
    private readonly researcherService: ResearchersService,
  ) {}

  @Post()
  async create(@Body() researchGroup: CreateResearchGroupDto) {
    //TODO Verificar se um líder de projeto existe e se é um Pesquisador

    if (researchGroup.img) {
      researchGroup.img = `/uploads/${researchGroup.img}`;
    }

    const researcher = await this.researcherService.findOne(
      researchGroup.researcherId,
      false,
    );

    if (!researcher) {
      // eslint-disable-next-line
      throw new NotFoundException('Pesquisador não encontrado.');
    }

    researchGroup.researcherId = researcher.id;
    return this.researchGroupsService.create(researchGroup);
  }

  @Get('/all')
  findAll() {
    return this.researchGroupsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('members') members?: boolean,
    @Query('projects') projects?: boolean,
  ) {
    if (members && projects) {
      return this.researchGroupsService.findOneComplete(id);
    }
    if (members) {
      return this.researchGroupsService.findOneWithMembers(id);
    }
    if (projects) {
      return this.researchGroupsService.findOneWithProjects(id);
    }
    return this.researchGroupsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() researchGroup: UpdateResearchGroupDto,
  ) {
    //TODO ampliar regras de validação
    return this.researchGroupsService.update(id, researchGroup);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.researchGroupsService.delete(id);
  }

  @Post('search')
  search(@Query('data') query: string, @Query('area') area: string) {
    return this.researchGroupsService.search(query, area);
  }

  @Get('/knowledgearea/all')
  findAllKnowledgeAreas() {
    return this.researchGroupsService.findAllKnowledgeAreas();
  }

  @Post('/send-email')
  sendEmail(
    @Body()
    body: {
      message: string;
      demandName: string;
      researchGroupId: string;
      companyName: string;
    },
  ) {
    return this.researchGroupsService.sendEmail(
      body.message,
      body.demandName,
      body.researchGroupId,
      body.companyName,
    );
  }
}
