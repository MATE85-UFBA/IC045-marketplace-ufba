import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ResearchersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: string, includeGroups: boolean) {
    const result = await this.prismaService.researcher.findUnique({
      where: {
        userId: id,
      },

      select: {
        urlLattes: true,
        researcherType: true,
        researchGroupsAsLeader: includeGroups
          ? {
              select: {
                id: true,
                name: true,
              },
            }
          : false,
        researchGroupsAsMember: includeGroups
          ? {
              select: {
                id: true,
                name: true,
              },
            }
          : false,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            img: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Researcher not found');
    }

    const researcher = {
      ...result.user,
      researcherType: result.researcherType,
      urlLattes: result.urlLattes,
      groupsAsLeader: result.researchGroupsAsLeader,
      groupsAsMember: result.researchGroupsAsMember,
    };

    return researcher;
  }

  async myResearchGroups(
    id: string,
    includeGroups: boolean,
    search: string,
    order: 'asc' | 'desc',
  ) {
    const result = await this.prismaService.researcher.findUnique({
      where: {
        userId: id,
      },

      select: {
        urlLattes: true,
        researcherType: true,
        researchGroupsAsMember: includeGroups
          ? {
              where: {
                name: {
                  contains: search || '',
                  mode: 'insensitive',
                },
              },
              select: {
                id: true,
                name: true,
                leader: {
                  select: {
                    userId: true,
                  },
                },
              },
              orderBy: {
                createdAt: order || 'asc',
              },
            }
          : false,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            img: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Researcher not found');
    }

    const researcher = {
      ...result.user,
      researcherType: result.researcherType,
      urlLattes: result.urlLattes,
      groupsAsMember: result.researchGroupsAsMember,
    };

    return researcher;
  }
}
