import { PrismaService } from '@/infra/database/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { DemandDTO } from './demand.dto';

@Injectable()
export class DemandService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(demand: DemandDTO) {
    const demandExists = await this.prismaService.demanda.findUnique({
      where: {
        title: demand.titulo,
      },
    });

    if (demandExists) {
      throw new ConflictException('Demanda já cadastrada');
    }

    const createDemand = await this.prismaService.demanda.create({
      data: {
        links: demand.links,
        title: demand.titulo,
        description: demand.descricao,
      },
    });

    return {
      id: createDemand.id,
      title: createDemand.title,
      links: createDemand.links,
      descricao: createDemand.description,
    };
  }

  findAll(): DemandDTO []{
    return this.findAll;
  }


}
