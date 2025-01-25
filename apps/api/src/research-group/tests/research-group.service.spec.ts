// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';
import { ResearchGroupService } from '@/research-group/research-group.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from '@/infra/database/prisma.service';
import { MailService } from '@/mailsend/mail.service';

describe('ResearchGroupService', () => {
  let service: ResearchGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, ResearchGroupService, PrismaService],
    }).compile();

    service = module.get<ResearchGroupService>(ResearchGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Integration test - ResearchGroupService - findOne', () => {
  let service: ResearchGroupService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, ResearchGroupService, PrismaService],
    }).compile();

    service = module.get<ResearchGroupService>(ResearchGroupService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return research group data when group is found', async () => {
    const mockResearchGroup = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Quantum Research Group',
      description: 'Research on quantum computing',
      urlCNPQ: 'https://cnpq.example.com/quantum-group',
      img: 'https://example.com/image.jpg',
      researcherId: '789e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.researchGroup, 'findUnique')
      .mockResolvedValue(mockResearchGroup);

    const result = await service.findOne(mockResearchGroup.id);

    expect(result).toEqual({
      id: mockResearchGroup.id,
      name: mockResearchGroup.name,
      description: mockResearchGroup.description,
      urlCNPQ: mockResearchGroup.urlCNPQ,
      img: mockResearchGroup.img,
      researcherId: mockResearchGroup.researcherId,
    });
  });

  it('should throw NotFoundException when research group is not found', async () => {
    jest
      .spyOn(prismaService.researchGroup, 'findUnique')
      .mockResolvedValue(null);

    await expect(service.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});

describe.skip('Integration test with database - findOne', () => {
  let service: ResearchGroupService;
  let prismaService: PrismaService;
  let savedResearchGroupId: string;

  beforeAll(async () => {
    console.log('before all');
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchGroupService, PrismaService],
    }).compile();

    service = module.get<ResearchGroupService>(ResearchGroupService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdResearchGroup = await prismaService.researchGroup.create({
      data: {
        name: 'Quantum Research Group',
        description: 'Research on quantum computing',
        urlCNPQ: 'https://cnpq.example.com/quantum-group',
        img: 'https://example.com/image.jpg',
        researcherId: '789e4567-e89b-12d3-a456-426614174000',
      },
    });

    savedResearchGroupId = createdResearchGroup.id;
  });

  it('should return the research group data when the group is found', async () => {
    const result = await service.findOne(savedResearchGroupId);
    expect(result.id).toEqual(savedResearchGroupId);
  });

  afterAll(async () => {
    await prismaService.researchGroup.delete({
      where: {
        id: savedResearchGroupId,
      },
    });

    await prismaService.$disconnect();
  });
});
