import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceService } from '../competence.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CompetenceService', () => {
  let service: CompetenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceService, PrismaService],
    }).compile();

    service = module.get<CompetenceService>(CompetenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('Integration test - CompetenceService - FindOne', () => {
  let service: CompetenceService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceService, PrismaService],
    }).compile();

    service = module.get<CompetenceService>(CompetenceService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return competence data when competence is found', async () => {
    const mockCompetence = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Competence 1',
      researchGroupId: '123e4567-e89b-12d3-a456-426614174000',
      demandId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.competence, 'findUnique')
      .mockResolvedValue(mockCompetence);

    const result = await service.findOne(mockCompetence.id);

    expect(result).toEqual({
      id: mockCompetence.id,
      name: mockCompetence.name,
      researchGroupId: mockCompetence.researchGroupId,
      demandId: mockCompetence.demandId,
      //createdAt: mockCompetence.createdAt,
      //updatedAt: mockCompetence.updatedAt,
    });
  });
  it('should throw NotFoundException when competence is not found', async () => {
    jest.spyOn(prismaService.competence, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
describe.skip('Integration test with database - findOne', () => {
  let service: CompetenceService;
  let prismaService: PrismaService;
  let savedCompetenceId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenceService, PrismaService],
    }).compile();

    service = module.get<CompetenceService>(CompetenceService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdCompetence = await prismaService.competence.create({
      data: {
        name: 'Competence 1',
        researchGroupId: '123e4567-e89b-12d3-a456-426614174000',
        demandId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    savedCompetenceId = createdCompetence.id;
  });

  it('should return the competence data when the competence is found', async () => {
    const result = await service.findOne(savedCompetenceId);
    expect(result.id).toEqual(savedCompetenceId);
  });

  afterAll(async () => {
    await prismaService.competence.delete({
      where: { id: savedCompetenceId },
    });
  });
});
