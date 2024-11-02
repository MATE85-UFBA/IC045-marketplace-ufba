import { Test, TestingModule } from '@nestjs/testing';
import { ResearcherGroupsController } from '../researcher-groups.controller';

describe('ResearcherGroupsController', () => {
  let controller: ResearcherGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearcherGroupsController],
    }).compile();

    controller = module.get<ResearcherGroupsController>(ResearcherGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
