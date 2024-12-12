import { PrismaService } from '@/infra/database/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO, SearchDemandDTO } from './demand.dto';
import { Demand, UserStatus } from '@prisma/client';
import { UserService } from '@/user/user.service';

@Injectable()
export class DemandService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(demand: CreateDemandDTO, companyId: string): Promise<Demand> {
    const { name, description } = demand;

    return this.prismaService.demand.create({
      data: {
        companyId: companyId,
        description: description,
        name: name,
        public: demand.public,
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
          company: true,
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
          company: true,
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
    const savedDemand = await this.prismaService.demand.findUniqueOrThrow({
      where: { id },
    });

    const updated = { ...savedDemand, ...demand };

    return this.prismaService.demand.update({ where: { id }, data: updated });
  }

  async findOne(id: string): Promise<Demand> {
    const demand = await this.prismaService.demand.findUnique({
      where: {
        id,
        public: true,
      },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrado');
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

  async search(criteria: SearchDemandDTO): Promise<Demand[]> {
    const { title, description, keywords, startDate, endDate } = criteria;
  
    // Definir explicitamente os filtros como `DemandWhereInput[]`
    const filters: Prisma.DemandWhereInput[] = [
      title ? { name: { contains: title, mode: 'insensitive' } } : null,
      description
        ? { description: { contains: description, mode: 'insensitive' } }
        : null,
      keywords && keywords.length > 0
        ? {
            keywords: {
              some: {
                name: { in: keywords },
              },
            },
          }
        : null,
      startDate
        ? {
            createdAt: {
              gte: new Date(startDate),
            },
          }
        : null,
      endDate
        ? {
            createdAt: {
              lte: new Date(endDate),
            },
          }
        : null,
    ].filter((filter): filter is Prisma.DemandWhereInput => filter !== null); // Filtrar `null` e garantir o tipo correto
  
    return this.prismaService.demand.findMany({
      where: {
        public: true,
        status: {
          not: 'DELETED',
        },
        AND: filters, // Aplicar os filtros definidos
      },
      include: {
        keywords: true,
      },
    });
  }
}
