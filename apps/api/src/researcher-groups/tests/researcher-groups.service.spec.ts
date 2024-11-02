import { Test, TestingModule } from '@nestjs/testing';
import { ResearcherGroupsService } from '../researcher-groups.service';

describe('ResearcherGroupsService', () => {
  let service: ResearcherGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearcherGroupsService],
    }).compile();

    service = module.get<ResearcherGroupsService>(ResearcherGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
