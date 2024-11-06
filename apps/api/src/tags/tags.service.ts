import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {PrismaService} from '@/infra/database/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(tag: CreateTagDto) {
    return this.prismaService.tbTags.create({
      data: {
        name: tag.name
      },
    });
  }

  async findAll() {
    return this.prismaService.tbTags.findMany();
  }

  async findOne(id: string) {
    const tag = await this.prismaService.tbTags.findUnique({
      where: {
        id: id
      }
    });

    if (!tag) throw new NotFoundException('Tag não encontrada');

    return {
      id: tag.id,
      name: tag.name,
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return this.prismaService.tbTags.update({
      where: {
        id: id
      },
      data: {
        name: updateTagDto.name
      }
    });
  }

  async remove(id: string) {
    return this.prismaService.tbTags.delete({
      where: {
        id: id
      }
    });
  }
}
