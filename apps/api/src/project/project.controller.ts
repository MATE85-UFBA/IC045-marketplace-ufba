import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { UpdateProjectDto } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  
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
  create(@Body() project: CreateProjectDto) {
    return this.projectService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: UpdateProjectDto) {
    return this.projectService.update(id, project);
  }

}
