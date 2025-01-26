import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../project.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('Integration test - ProjectService - FindOne', () => {
  let service: ProjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return project data when project is found', async () => {
    const mockProject = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Project 1',
      link: 'https://example.com',
      researchGroupId: '123e4567-e89b-12d3-a456-426614174000',
      demandId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.project, 'findUnique')
      .mockResolvedValue(mockProject);

    const result = await service.findOne(mockProject.id);

    expect(result).toEqual({
      id: mockProject.id,
      name: mockProject.name,
      link: mockProject.link,
      researchGroupId: mockProject.researchGroupId,
      demandId: mockProject.demandId,
      //createdAt: mockProject.createdAt,
      //updatedAt: mockProject.updatedAt,
    });
  });
  it('should throw NotFoundException when project is not found', async () => {
    jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
describe.skip('Integration test with database - findOne', () => {
  let service: ProjectService;
  let prismaService: PrismaService;
  let savedProjectId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, PrismaService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdProject = await prismaService.project.create({
      data: {
        name: 'Project 1',
        link: 'https://example.com',
        researchGroupId: '123e4567-e89b-12d3-a456-426614174000',
        demandId: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    savedProjectId = createdProject.id;
  });

  it('should return the project data when the project is found', async () => {
    const result = await service.findOne(savedProjectId);
    expect(result.id).toEqual(savedProjectId);
  });

  afterAll(async () => {
    await prismaService.project.delete({
      where: { id: savedProjectId },
    });
  });
});
