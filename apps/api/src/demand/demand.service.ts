import { PrismaService } from '@/infra/database/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO } from './demand.dto';
import { Demand, UserStatus } from '@prisma/client';
import { UserService } from '@/user/user.service';

@Injectable()
export class DemandService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(demand: CreateDemandDTO, companyId: string): Promise<Demand> {
    const { name, description, link, keywords = [] } = demand;
    const keywordsIds = keywords.map((k) => ({ id: k }));

    return this.prismaService.demand.create({
      data: {
        companyId: companyId,
        description: description,
        name: name,
        link: link,
        public: demand.public,
        keywords: {
          connect: keywordsIds,
        },
      },
    });
  }

  async all(): Promise<Demand[]> {
    return (
      this.prismaService.demand.findMany({
        where: {
          public: true,
          status: {
            not: 'DELETED',
          },
        },
        include: {
          company: {
            include: {
              user: true,
            },
          },
          keywords: true,
        },
      }) || []
    );
  }

  async my(userId: string): Promise<Demand[]> {
    return (
      this.prismaService.demand.findMany({
        where: {
          companyId: userId,
          status: {
            not: 'DELETED',
          },
        },
        include: {
          company: {
            include: {
              user: true,
            },
          },
          keywords: true,
        },
      }) || []
    );
  }

  async delete(id: string) {
    return this.prismaService.demand.update({
      data: { status: 'DELETED' },
      where: { id },
    });
  }

  async patch(id: string, demand: UpdateDemandDTO): Promise<Demand> {
    const { keywords = [] } = demand;
    const keywordsIds = keywords.map((k) => ({ id: k }));

    delete demand.keywords;

    const savedDemand = await this.prismaService.demand.findUniqueOrThrow({
      where: { id },
    });

    const updated = { ...savedDemand, ...demand };

    return this.prismaService.demand.update({
      where: { id },
      data: { ...updated, keywords: { set: [], connect: keywordsIds } },
    });
  }

  async findOne(id: string): Promise<Demand> {
    const demand = await this.prismaService.demand.findUnique({
      where: {
        id,
        public: true,
      },
      include: {
        projects: true,
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada');
    }

    return demand;
  }

  async findOneIncludingPrivate(id: string, userId: string): Promise<Demand> {
    const demand = await this.prismaService.demand.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrada');
    }

    if (demand.public) {
      return demand;
    }

    const user = await this.userService.findOneWithProfiles(userId);

    if (user.researcher && user.status == UserStatus.APPROVED) {
      return demand;
    }

    if (demand?.company?.user?.id == userId) {
      return demand;
    }

    throw new ForbiddenException('Você não tem acesso a esta demanda');
  }

  async suggest(
    query: string,
  ): Promise<{ id: string; name: string; description: string }[]> {
    return this.prismaService.demand.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            keywords: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc', // Ordena pelas demandas mais recentes
      },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
      take: 10, // Limita os resultados a 10 sugestões
    });
  }

  async suggestFilter(
    query: string,
    userId: string,
  ): Promise<{ id: string; name: string; description: string }[]> {
    return this.prismaService.demand.findMany({
      where: {
        companyId: userId,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            keywords: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc', // Ordena pelas demandas mais recentes
      },
      include: {
        company: {
          include: {
            user: true,
          },
        },
        keywords: true,
      },
      take: 10, // Limita os resultados a 10 sugestões
    });
  }
}
