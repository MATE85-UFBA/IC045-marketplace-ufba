import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(project: CreateProjectDto) {
    const projectAlreadyExists = await this.prismaService.project.findUnique({
      where: {
        name: project.name,
      },
    });
    if (projectAlreadyExists)
      throw new ConflictException('Projeto já cadastrado');

    const createdProject = await this.prismaService.project.create({
      data: {
        name: project.name,
        started_at: project.started_at,
        finished_at: project.finished_at,
        researchGroupId: project.researchGroupId,
        demandId: project.demandId,
      },
    });

    return {
      id: createdProject.id,
      name: createdProject.name,
      started_at: createdProject.started_at,
      finished_at: createdProject.finished_at,
      researchGroupId: createdProject.researchGroupId,
      demandId: createdProject.demandId,
    };
  }

  async findOne(id: string) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!project) throw new NotFoundException('Projeto não encontrado');

    return {
      id: project.id,
      name: project.name,
      started_at: project.started_at,
      finished_at: project.finished_at,
      researchGroupId: project.researchGroupId,
      demandId: project.demandId,
    };
  }

  async update(id: string, project: CreateProjectDto) {
    const updatedProject = await this.prismaService.project.update({
      where: {
        id: id,
      },
      data: {
        name: project.name,
        started_at: project.started_at,
        finished_at: project.finished_at,
        researchGroupId: project.researchGroupId,
        demandId: project.demandId,
      },
    });

    return {
      id: updatedProject.id,
      name: updatedProject.name,
      started_at: updatedProject.started_at,
      finished_at: updatedProject.finished_at,
      researchGroupId: updatedProject.researchGroupId,
      demandId: updatedProject.demandId,
    };
  }

  async delete(id: string) {
    const project = await this.prismaService.project.delete({
      where: {
        id: id,
      },
    });

    return {
      id: project.id,
      name: project.name,
      started_at: project.started_at,
      finished_at: project.finished_at,
      researchGroupId: project.researchGroupId,
      demandId: project.demandId,
    };
  }

  async findByName(name: string) {
    return await this.prismaService.project.findUnique({
      where: {
        name,
      },
    });
  }
}
