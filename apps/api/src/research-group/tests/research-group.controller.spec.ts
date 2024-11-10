import { Test, TestingModule } from '@nestjs/testing';
import { ResearchGroupsController } from '../research-group.controller';

describe('ResearchGroupsController', () => {
  let controller: ResearchGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchGroupsController],
    }).compile();

    controller = module.get<ResearchGroupsController>(ResearchGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
