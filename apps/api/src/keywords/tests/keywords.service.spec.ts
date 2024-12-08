// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from '../keywords.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('KeywordsService', () => {
  let keywordsService: KeywordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordsService, PrismaService],
    }).compile();

    keywordsService = module.get<KeywordsService>(KeywordsService);
  });

  it('should be defined', () => {
    expect(keywordsService).toBeDefined();
  });
});

describe('Integration test - findOne', () => {
  let keywordsService: KeywordsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordsService, PrismaService],
    }).compile();

    keywordsService = module.get<KeywordsService>(KeywordsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return keyword data when keyword is found', async () => {
    const mockKeyword = {
      id: '94b6ce74-3e80-4968-8956-7d812f4a295a',
      name: 'Inteligência Artificial',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.keyword, 'findUnique')
      .mockResolvedValue(mockKeyword);

    const result = await keywordsService.findOne(mockKeyword.id);

    expect(result).toEqual({
      id: mockKeyword.id,
      name: mockKeyword.name,
    });
  });

  it('should throw NotFoundException when keyword is not found', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    await expect(
      keywordsService.findOne('94b6ce74-3d55-4968-8956-7d812f4a295a'),
    ).rejects.toThrow(NotFoundException);
  });
});
