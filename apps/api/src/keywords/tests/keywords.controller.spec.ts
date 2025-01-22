import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsController } from '../keywords.controller';
import { KeywordsService } from '../keywords.service';
import { PrismaService } from '@/infra/database/prisma.service';

describe('KeywordsController', () => {
  let controller: KeywordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordsController],
      providers: [KeywordsService, PrismaService],
    }).compile();

    controller = module.get<KeywordsController>(KeywordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
