import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResearchGroupService } from './research-group.service';
import { CreateResearchGroupDto, UpdateResearchGroupDto } from './research-group.dto';


//TODO colocar os useGuard
@Controller('researchgroup')
export class ResearchGroupController {
  constructor(
    private readonly researchGroupsSevice: ResearchGroupService,
  ) {}

  @Post()
  async create(@Body() researchGroup: CreateResearchGroupDto) {
    //TODO Verificar se um líder de projeto existe e se é um Pesquisador
    return this.researchGroupsSevice.create(researchGroup);
  }

  @Get('/all')
  findAll() {
    return this.researchGroupsSevice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchGroupsSevice.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() researchGroup: UpdateResearchGroupDto,
  ) {
    //TODO ampliar regras de validação
    return this.researchGroupsSevice.update(id, researchGroup);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.researchGroupsSevice.delete(id);
  }
}
