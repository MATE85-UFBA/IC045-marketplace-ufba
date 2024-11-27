import { Test, TestingModule } from '@nestjs/testing';
import { ResearchersService } from '../researchers.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResearcherType } from '@prisma/client';

describe('ResearchersService', () => {
  let service: ResearchersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchersService, PrismaService],
    }).compile();

    service = module.get<ResearchersService>(ResearchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Integration test - ResearchersService - findOne', () => {
  let service: ResearchersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchersService, PrismaService],
    }).compile();

    service = module.get<ResearchersService>(ResearchersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should return researcher data when researcher is found', async () => {
    const mockResearcher = {
      urlLattes: 'http://lattes.cnpq.br/6271096128174325',
      researcherType: ResearcherType.TEACHER,
      researchGroupsAsLeader: [
        {
          id: '5df58413-dadb-446b-91d7-e82ffce3e24a',
          name: 'RECSYS: Recommender Systems Research Group',
        },
        {
          id: '3ffe6190-adb2-49dd-9614-e3714e443539',
          name: 'WISER: Web, Internet and Intelligent Systems Research Group',
        },
      ],
      researchGroupsAsMember: [
        {
          id: '5df58413-dadb-446b-91d7-e82ffce3e24a',
          name: 'RECSYS: Recommender Systems Research Group',
        },
        {
          id: '3ffe6190-adb2-49dd-9614-e3714e443539',
          name: 'WISER: Web, Internet and Intelligent Systems Research Group',
        },
      ],
      user: {
        id: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
        name: 'Fred Durão',
        email: 'fred.durao@email.com.br',
        img: '',
      },
    };

    jest
      .spyOn(prismaService.researcher, 'findUnique')
      .mockResolvedValueOnce(mockResearcher as any);

    const result = await service.findOne(mockResearcher.user.id, true);

    expect(result).toEqual({
      id: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
      name: 'Fred Durão',
      email: 'fred.durao@email.com.br',
      img: '',
      researcherType: 'TEACHER',
      urlLattes: 'http://lattes.cnpq.br/6271096128174325',
      groupsAsLeader: [
        {
          id: '5df58413-dadb-446b-91d7-e82ffce3e24a',
          name: 'RECSYS: Recommender Systems Research Group',
        },
        {
          id: '3ffe6190-adb2-49dd-9614-e3714e443539',
          name: 'WISER: Web, Internet and Intelligent Systems Research Group',
        },
      ],
      groupsAsMember: [
        {
          id: '5df58413-dadb-446b-91d7-e82ffce3e24a',
          name: 'RECSYS: Recommender Systems Research Group',
        },
        {
          id: '3ffe6190-adb2-49dd-9614-e3714e443539',
          name: 'WISER: Web, Internet and Intelligent Systems Research Group',
        },
      ],
    });
  });
});
