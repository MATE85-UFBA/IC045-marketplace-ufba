import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO } from './demand.dto';
import { Demand } from '@prisma/client';

@Injectable()
export class DemandService {
  constructor(private readonly prismaService: PrismaService) {}

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
      where: { id },
    });

    if (!demand) {
      throw new NotFoundException('Demanda não encontrado');
    }

    return demand;
  }
}
