import { Test, TestingModule } from '@nestjs/testing';
import { ResearchersService } from '../researchers.service';

describe('ResearchersService', () => {
  let service: ResearchersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchersService],
    }).compile();

    service = module.get<ResearchersService>(ResearchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
