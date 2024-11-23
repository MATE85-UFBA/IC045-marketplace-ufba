import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandDTO, UpdateDemandDTO } from './demand.dto';
import { Demand } from '@prisma/client';

@Injectable()
export class DemandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(demand: CreateDemandDTO, companyId: string): Promise<Demand> {
    const { name } = demand;
    return this.prismaService.demand.create({
      data: {
        companyId: companyId,
        name: name,
      },
    });
  }

  async all(): Promise<Demand[]> {
    return this.prismaService.demand.findMany() || [];
  }

  async my(userId: string): Promise<Demand[]> {
    return (
      this.prismaService.demand.findMany({
        where: { companyId: userId },
      }) || []
    );
  }

  async delete(id: string) {
    return this.prismaService.demand.delete({ where: { id } });
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
