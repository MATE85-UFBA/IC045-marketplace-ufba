import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateResearchGroupDto,
  UpdateResearchGroupDto,
} from './research-group.dto';

@Injectable()
export class ResearchGroupService {
  findAll() {
    return this.prismaService.researchGroup.findMany();
  }
  constructor(private readonly prismaService: PrismaService) {}

  async create(group: CreateResearchGroupDto) {
    const groupAlreadyExists =
      await this.prismaService.researchGroup.findUnique({
        where: {
          name: group.name,
        },
      });
    if (groupAlreadyExists)
      throw new ConflictException('Grupo de pesquisa já cadastrado');
    const memberId = group.members?.map((m) => ({ userId: m }));
    const knowledgeAreasId = group.knowledgeAreas?.map((k) => ({ id: k }));
    const createdGroup = await this.prismaService.researchGroup.create({
      data: {
        name: group.name,
        description: group.description,
        urlCNPQ: group.urlCNPQ,
        img: group.img,
        researcherId: group.researcherId,
        members: {
          connect: memberId,
        },
        knowledgeAreas: {
          connect: knowledgeAreasId,
        },
      },
    });

    return {
      id: createdGroup.id,
      name: createdGroup.name,
      description: createdGroup.description,
      urlCNPQ: createdGroup.urlCNPQ,
      img: createdGroup.img,
      researcherId: createdGroup.researcherId,
    };
  }

  async findOne(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
    };
  }

  async findOneWithMembers(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        members: true,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      members: group.members,
    };
  }

  async findOneWithProjects(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        projects: true,
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      projects: group.projects,
    };
  }

  async findOneComplete(id: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: {
        id,
      },
      include: {
        leader: true,
        projects: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
      leader: group.leader,
      projects: group.projects,
      members: group.members,
    };
  }

  async update(id: string, group: UpdateResearchGroupDto) {
    const updatedGroup = await this.prismaService.researchGroup.update({
      where: {
        id: id,
      },
      data: {
        name: group.name,
        description: group.description,
        urlCNPQ: group.urlCNPQ,
        img: group.img,
        researcherId: group.researcherId,
      },
    });

    return {
      id: updatedGroup.id,
      name: updatedGroup.name,
      description: updatedGroup.description,
      urlCNPQ: updatedGroup.urlCNPQ,
      img: updatedGroup.img,
      researcherId: updatedGroup.researcherId,
    };
  }

  async delete(id: string) {
    const group = await this.prismaService.researchGroup.delete({
      where: {
        id: id,
      },
    });

    return {
      id: group.id,
      name: group.name,
      description: group.description,
      urlCNPQ: group.urlCNPQ,
      img: group.img,
      researcherId: group.researcherId,
    };
  }

  async findByName(name: string) {
    return await this.prismaService.researchGroup.findUnique({
      where: {
        name,
      },
    });
  }

  async search(query: string, area: string) {
    return await this.prismaService.researchGroup.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
        AND: [
          area
            ? {
                knowledgeAreas: {
                  some: { name: { in: area.split('/'), mode: 'insensitive' } },
                },
              }
            : {},
        ],
      },
    });
  }

  async findAllKnowledgeAreas() {
    return await this.prismaService.knowledgeArea.findMany();
  }

  async updateImage(id: string, imgPath: string) {
    const group = await this.prismaService.researchGroup.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException('Grupo de pesquisa não encontrado.');
    }

    return await this.prismaService.researchGroup.update({
      where: { id },
      data: { img: imgPath },
    });
  }
}
