import { Test, TestingModule } from '@nestjs/testing';
import { ResearchersController } from '../researchers.controller';

describe('ResearchersController', () => {
  let controller: ResearchersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchersController],
    }).compile();

    controller = module.get<ResearchersController>(ResearchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
