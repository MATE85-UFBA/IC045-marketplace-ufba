import { Test, TestingModule } from '@nestjs/testing';
import { CompetenceController } from '../competence.controller';
import { CompetenceService } from '../competence.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchGroupService } from '@/research-group/research-group.service';

describe('CompetenceController', () => {
  let controller: CompetenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenceController],
      providers: [CompetenceService, PrismaService, ResearchGroupService],
    }).compile();

    controller = module.get<CompetenceController>(CompetenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
