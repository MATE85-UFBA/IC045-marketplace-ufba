import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(project: CreateProjectDto): Promise<Project> {
    const projectAlreadyExists = await this.prismaService.project.findFirst({
      where: {
        name: project.name,
      },
    });
    if (projectAlreadyExists)
      throw new ConflictException('Projeto já cadastrado');

    const { keywords = [] } = project;
    const keywordsIds = keywords.map((k) => ({ id: k }));

    const createdProject = await this.prismaService.project.create({
      data: {
        name: project.name,
        researchGroupId: project.researchGroupId,
        link: project.link,
        demandId: project.demandId,
        keywords: {
          connect: keywordsIds,
        },
      },
    });

    return {
      id: createdProject.id,
      name: createdProject.name,
      link: createdProject.link,
      researchGroupId: createdProject.researchGroupId,
      demandId: createdProject.demandId,
      createdAt: createdProject.createdAt,
      updatedAt: createdProject.updatedAt,
    };
  }

  async findOne(id: string) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });

    if (!project) throw new NotFoundException('Projeto não encontrado');

    return {
      id: project.id,
      name: project.name,
      link: project.link,
      researchGroupId: project.researchGroupId,
      demandId: project.demandId,
    };
  }

  async findAll() {
    const projects = await this.prismaService.project.findMany();
    return projects;
  }

  async update(id: string, project: UpdateProjectDto) {
    const updatedProject = await this.prismaService.project.update({
      where: {
        id: id,
      },
      data: {
        name: project.name,
        link: project.link,
        researchGroupId: project.researchGroupId,
        demandId: project.demandId,
      },
    });

    return {
      id: updatedProject.id,
      name: updatedProject.name,
      link: updatedProject.link,
      researchGroupId: updatedProject.researchGroupId,
      demandId: updatedProject.demandId,
    };
  }

  async delete(id: string) {
    const project = await this.prismaService.project.delete({
      where: { id },
    });

    return {
      id: project.id,
      name: project.name,
      link: project.link,
      researchGroupId: project.researchGroupId,
      demandId: project.demandId,
    };
  }

  async findByName(name: string) {
    return this.prismaService.project.findFirst({
      where: {
        name,
      },
    });
  }
}
