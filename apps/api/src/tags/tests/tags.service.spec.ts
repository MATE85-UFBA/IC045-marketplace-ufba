// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from '../tags.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('TagsService', () => {
  let tagsService: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, PrismaService],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(tagsService).toBeDefined();
  });
});

describe('Integration test - findOne', () => {
  let tagsService: TagsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, PrismaService],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return tag data when tag is found', async () => {
    const mockTag = {
      id: '94b6ce74-3e80-4968-8956-7d812f4a295a',
      name: 'Inteligência Artificial',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.keyword, 'findUnique').mockResolvedValue(mockTag);

    const result = await tagsService.findOne(mockTag.id);

    expect(result).toEqual({
      id: mockTag.id,
      name: mockTag.name,
    });
  });

  it('should throw NotFoundException when tag is not found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(
      tagsService.findOne('94b6ce74-3d55-4968-8956-7d812f4a295a'),
    ).rejects.toThrow(NotFoundException);
  });
});
