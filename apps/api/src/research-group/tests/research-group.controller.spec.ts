import { Test, TestingModule } from '@nestjs/testing';
import { ResearchGroupsController } from '../research-group.controller';
import { ResearchGroupService } from '../research-group.service';
import { PrismaService } from '@/infra/database/prisma.service';

describe('ResearchGroupsController', () => {
  let controller: ResearchGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchGroupsController],
      providers: [ResearchGroupService, PrismaService]
    }).compile();

    controller = module.get<ResearchGroupsController>(ResearchGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
