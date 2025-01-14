import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompetenceDto, UpdateCompetenceDto } from './competence.dto';
import { Competence } from '@prisma/client';

@Injectable()
export class CompetenceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(competence: CreateCompetenceDto): Promise<Competence> {
    const competenceAlreadyExists =
      await this.prismaService.competence.findFirst({
        where: {
          name: competence.name,
        },
      });
    if (competenceAlreadyExists)
      throw new ConflictException('Competência já cadastrada');

    const { keywords = [] } = competence;
    const keywordsIds = keywords.map((k) => ({ id: k }));

    const createdCompetence = await this.prismaService.competence.create({
      data: {
        name: competence.name,
        researchGroupId: competence.researchGroupId,
        demandId: competence.demandId,
        keywords: {
          connect: keywordsIds,
        },
      },
    });

    return {
      id: createdCompetence.id,
      name: createdCompetence.name,
      researchGroupId: createdCompetence.researchGroupId,
      demandId: createdCompetence.demandId,
      createdAt: createdCompetence.createdAt,
      updatedAt: createdCompetence.updatedAt,
    };
  }

  async findOne(id: string) {
    const competence = await this.prismaService.competence.findUnique({
      where: { id },
    });

    if (!competence) throw new NotFoundException('Competência não encontrada');

    return {
      id: competence.id,
      name: competence.name,
      researchGroupId: competence.researchGroupId,
      demandId: competence.demandId,
    };
  }

  async findAll() {
    const competences = await this.prismaService.competence.findMany();
    return competences;
  }

  async update(id: string, competence: UpdateCompetenceDto) {
    const updatedCompetence = await this.prismaService.competence.update({
      where: {
        id: id,
      },
      data: {
        name: competence.name,
        researchGroupId: competence.researchGroupId,
        demandId: competence.demandId,
      },
    });

    return {
      id: updatedCompetence.id,
      name: updatedCompetence.name,
      researchGroupId: updatedCompetence.researchGroupId,
      demandId: updatedCompetence.demandId,
    };
  }

  async delete(id: string) {
    const competence = await this.prismaService.competence.delete({
      where: { id },
    });

    return {
      id: competence.id,
      name: competence.name,
      researchGroupId: competence.researchGroupId,
      demandId: competence.demandId,
    };
  }

  async findByName(name: string) {
    return this.prismaService.competence.findFirst({
      where: {
        name,
      },
    });
  }
}
