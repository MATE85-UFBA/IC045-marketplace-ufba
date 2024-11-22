import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from '../project.controller';
import { ProjectService } from '../project.service';
import { PrismaService } from '@/infra/database/prisma.service';

describe('ProjectController', () => {
  let controller: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, PrismaService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
