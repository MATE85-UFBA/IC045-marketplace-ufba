import { Test, TestingModule } from '@nestjs/testing';
import { ResearchersController } from '../researchers.controller';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearchersService } from '../researchers.service';

describe('ResearchersController', () => {
  let controller: ResearchersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchersController],
      providers: [PrismaService, ResearchersService],
    }).compile();

    controller = module.get<ResearchersController>(ResearchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
