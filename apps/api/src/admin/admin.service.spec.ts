import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../infra/database/prisma.service';
import { UserRole, UserStatus } from '@prisma/client';
import * as UserTypes from '@/user/utils/user.types.util';

describe('AdminService', () => {
  let service: AdminService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            researcher: {
              count: jest.fn(),
            },
            company: {
              count: jest.fn(),
            },
            researchGroup: {
              count: jest.fn(),
              findMany: jest.fn(),
            },
            demand: {
              count: jest.fn(),
              groupBy: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should get users', async () => {
    const users = [
      {
        id: '1',
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        role: UserRole.USER,
        img: null,
        resetToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: UserStatus.APPROVED,
        utype: UserTypes.NONE,
      },
    ];
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    expect(await service.getUsers()).toEqual(users);
  });

  it('should delete user', async () => {
    const id = '1';
    const deletedUser = {
      id,
      name: 'John',
      email: 'john@example.com',
      role: UserRole.USER,
      password: 'password',
      img: null,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(deletedUser);

    expect(await service.deleteUser(id)).toEqual(deletedUser);
  });

  it('should get entity counts', async () => {
    jest.spyOn(prismaService.researcher, 'count').mockResolvedValue(10);
    jest.spyOn(prismaService.company, 'count').mockResolvedValue(5);
    jest.spyOn(prismaService.researchGroup, 'count').mockResolvedValue(3);
    jest.spyOn(prismaService.demand, 'count').mockResolvedValue(20);

    expect(await service.getEntityCounts()).toEqual({
      companies: 5,
      researchers: 10,
      researchGroups: 3,
      demands: 20,
    });
  });

  it('should get demands by company', async () => {
    const demandsByCompany = [
      {
        companyId: '1',
        _count: { id: 5 },
        id: '1',
        name: 'Demand 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'CREATED',
        description: 'Description 1',
        public: true,
        _min: {},
        _max: {},
      },

      {
        companyId: '2',
        _count: { id: 3 },
        id: '2',
        name: 'Demand 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'CREATED',
        description: 'Description 2',
        public: true,
        _min: {},
        _max: {},
      },
    ];
    jest
      .spyOn(prismaService.demand, 'groupBy')
      .mockResolvedValue(demandsByCompany);

    expect(await service.getDemandsByCompany()).toEqual(demandsByCompany);
  });

  it('should get demands by research group', async () => {
    const demandsByResearchGroup = [
      {
        id: '1',
        name: 'Group 1',
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Description 1',
        urlCNPQ: null,
        researcherId: '1',
        _count: { projects: 2 },
      },

      {
        id: '2',
        name: 'Group 2',
        img: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Description 2',
        urlCNPQ: null,
        researcherId: '2',
        _count: { projects: 4 },
      },
    ];
    jest
      .spyOn(prismaService.researchGroup, 'findMany')
      .mockResolvedValue(demandsByResearchGroup);

    expect(await service.getDemandsByResearchGroup()).toEqual(
      demandsByResearchGroup,
    );
  });
});
