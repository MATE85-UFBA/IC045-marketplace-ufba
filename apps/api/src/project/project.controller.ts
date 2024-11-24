import { 
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { UpdateProjectDto } from './project.dto';
import { ResearchGroupService } from '@/research-group/research-group.service';

//TODO colocar os useGuard
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly researchGroupService: ResearchGroupService,
  ) {}
  
  @Get('/all')
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }

  @Post()
  async create( @Body() project: CreateProjectDto ) {
    const researchGroup = await this.researchGroupService.findOne(project.researchGroupId);

    if(!researchGroup){
      throw new NotFoundException('Grupo de Pesquisa não existe');
    }

    return this.projectService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: UpdateProjectDto) {
    return this.projectService.update(id, project);
  }
}
