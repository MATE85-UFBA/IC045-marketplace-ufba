import { Test, TestingModule } from '@nestjs/testing';
import { ResearchGroupController } from '../research-group.controller';
import { ResearchGroupService } from '../research-group.service';
import { PrismaService } from '@/infra/database/prisma.service';

describe('ResearchGroupController', () => {
  let controller: ResearchGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchGroupController],
      providers: [ResearchGroupService, PrismaService],
    }).compile();

    controller = module.get<ResearchGroupController>(ResearchGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
