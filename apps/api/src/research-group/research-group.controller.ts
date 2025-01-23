import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ResearchGroupService } from './research-group.service';
import {
  CreateResearchGroupDto,
  UpdateResearchGroupDto,
} from './research-group.dto';
import { ResearchersService } from '@/researchers/researchers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

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

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/research-groups', // Pasta para salvar as imagens
        filename: (req: any, file: any, callback: any) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (
        req: any,
        file: { mimetype: string },
        callback: (arg0: null, arg1: boolean) => void,
      ) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            // @ts-ignore
            new BadRequestException('Apenas imagens são permitidas.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo de imagem não encontrado.');
    }
    const updatedGroup = await this.researchGroupsService.updateImage(
      id,
      file.filename,
    );
    return updatedGroup;
  }
}
