import { Test, TestingModule } from '@nestjs/testing';
import { ResearchersService } from '../researchers.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearcherType } from '@prisma/client';

describe('ResearchersService', () => {
  let service: ResearchersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchersService],
    }).compile();

    service = module.get<ResearchersService>(ResearchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Integration test - ResearchersService - findOne', () => {
  let service: ResearchersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchersService, PrismaService],
    }).compile();

    service = module.get<ResearchersService>(ResearchersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should return researcher data when researcher is found', async () => {
    const mockResearcher = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john.doe@email.com',
      urlLattes: 'https://lattes.example.com/johndoe',
      img: 'https://example.com/image.jpg',
      researcherType: ResearcherType.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.researcher, 'findUnique')
      .mockResolvedValue(mockResearcher);

    const result = await service.findOne(mockResearcher.userId, false);

    expect(result).toEqual({
      userId: mockResearcher.userId,
      name: mockResearcher.name,
      email: mockResearcher.email,
      urlLattes: mockResearcher.urlLattes,
      img: mockResearcher.img,
      researcherType: mockResearcher.researcherType,
    });
  });
});
