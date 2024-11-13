import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(tag: CreateTagDto) {
    return this.prismaService.keyword.create({
      data: {
        name: tag.name,
      },
    });
  }

  async findAll() {
    return this.prismaService.keyword.findMany();
  }

  async findOne(id: string) {
    const tag = await this.prismaService.keyword.findUnique({
      where: {
        id: id,
      },
    });

    if (!tag) throw new NotFoundException('Tag não encontrada');

    return {
      id: tag.id,
      name: tag.name,
    };
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return this.prismaService.keyword.update({
      where: {
        id: id,
      },
      data: {
        name: updateTagDto.name,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.keyword.delete({
      where: {
        id: id,
      },
    });
  }
}
