import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class KeywordsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByText(text: string) {
    const keywordList = await this.prismaService.keyword.findMany();
    return keywordList.filter((keyword) => keyword.name.toLowerCase().includes(text.toLowerCase()));
  }

  async create(keyword: CreateKeywordDto) {
    return this.prismaService.keyword.create({
      data: {
        name: keyword.name,
      },
    });
  }

  async findAll() {
    return this.prismaService.keyword.findMany();
  }

  async findOne(id: string) {
    const keyword = await this.prismaService.keyword.findUnique({
      where: {
        id: id,
      },
    });

    if (!keyword) throw new NotFoundException('Keyword não encontrada');

    return {
      id: keyword.id,
      name: keyword.name,
    };
  }

  async update(id: string, updateKeywordDto: UpdateKeywordDto) {
    return this.prismaService.keyword.update({
      where: {
        id: id,
      },
      data: {
        name: updateKeywordDto.name,
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
