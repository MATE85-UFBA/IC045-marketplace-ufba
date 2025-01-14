import { ForbiddenException } from '@nestjs/common';

import { demands } from './fixtures';
import { DemandController } from '@/demand/demand.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from '@/infra/database/prisma.service';
import { DemandService } from '@/demand/demand.service';
import { UserService } from '@/user/user.service';
import { User, UserRole, UserStatus } from '@prisma/client';

describe('DemandService', () => {
  let demandService: DemandService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandController],
      providers: [DemandService, PrismaService, UserService],
    }).compile();

    demandService = module.get<DemandService>(DemandService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(demandService).toBeDefined();
  });

  it('should return demand data when group is found', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: true,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    const result = await demandService.findOne(mockDemand.id);

    expect(result).toEqual({
      id: mockDemand.id,
      name: mockDemand.name,
      companyId: mockDemand.companyId,
      description: 'teste description',
      public: true,
      status: 'CREATED',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw NotFoundException when demand is not found', async () => {
    jest.spyOn(prismaService.demand, 'findUnique').mockResolvedValue(null);

    await expect(demandService.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return all demands', async () => {
    jest.spyOn(prismaService.demand, 'findMany').mockResolvedValue(demands);

    const result = await demandService.all();

    expect(result.map((d) => d.name)).toEqual([
      'Demand',
      'Demand 2',
      'Demand 3',
    ]);
  });

  it('should patch a demand', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: true,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.demand, 'findUniqueOrThrow')
      .mockResolvedValue(mockDemand);

    const spyPrismaUpdate = jest
      .spyOn(prismaService.demand, 'update')
      .mockImplementation((x: any) => x);

    await demandService.patch('some-id', { name: 'teste' });

    expect(spyPrismaUpdate).toHaveBeenCalledWith({
      data: {
        companyId: '123e4567-e89b-12d3-a456-426614174000',
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'teste',
        description: 'teste description',
        public: true,
        status: 'CREATED',
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
        keywords: {
          connect: [],
          set: [],
        },
      },
      where: {
        id: 'some-id',
      },
    });
  });

  it('should NOT patch if not exists', async () => {
    jest
      .spyOn(prismaService.demand, 'findUniqueOrThrow')
      .mockRejectedValue(new Error('Not found'));

    await expect(
      demandService.patch('some-id', { name: 'teste' }),
    ).rejects.toThrow();
  });

  it('findOnePrivate() - public demand- should return demand', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: true,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUser: User = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await demandService.findOneIncludingPrivate(
      mockDemand.id,
      mockUser.id,
    );
    expect(result).toEqual(expect.objectContaining(mockDemand));
  });

  it('findOnePrivate() - private demand- user blocked - should throw ForbiddenException', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: false,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.BLOCK,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      researcher: {
        userId: '123e4567-e89b-12d3-a456-426614174000',
      },
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    await expect(
      demandService.findOneIncludingPrivate(mockDemand.id, mockUser.id),
    ).rejects.toThrow(ForbiddenException);
  });

  it('findOnePrivate() - private demand - researcher - allow', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: false,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      researcher: {
        userId: '123e4567-e89b-12d3-a456-426614174000',
      },
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await demandService.findOneIncludingPrivate(
      mockDemand.id,
      mockUser.id,
    );
    expect(result).toEqual(expect.objectContaining(mockDemand));
  });

  it('findOnePrivate() - private demand - non profile - deny', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: false,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    await expect(
      demandService.findOneIncludingPrivate(mockDemand.id, mockUser.id),
    ).rejects.toThrow(ForbiddenException);
  });

  it('findOnePrivate() - private demand - company owner - return demand', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: false,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
    };
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);

    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await demandService.findOneIncludingPrivate(
      mockDemand.id,
      mockUser.id,
    );
    expect(result).toEqual(expect.objectContaining(mockDemand));
  });

  it('findOnePrivate() - private demand - company but not owner - should throw ForbiddenException ', async () => {
    const mockDemand = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Demand',
      description: 'teste description',
      public: false,
      status: 'CREATED',
      companyId: '123e4567-e89b-12d3-a456-426614174000',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@test.com',
      name: 'User',
      img: null,
      password: '123456',
      role: UserRole.USER,
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      company: {
        userId: '123e4567-e89b-12d3-a456-426614174000',
      },
    };

    jest
      .spyOn(prismaService.demand, 'findUnique')
      .mockResolvedValue(mockDemand);
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    await expect(
      demandService.findOneIncludingPrivate(mockDemand.id, mockUser.id),
    ).rejects.toThrow(ForbiddenException);
  });
});
