import { Test, TestingModule } from '@nestjs/testing';
import { ResearchGroupsService } from '../research-groups.service';

describe('ResearchGroupsService', () => {
  let service: ResearchGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchGroupsService],
    }).compile();

    service = module.get<ResearchGroupsService>(ResearchGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
