// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { demands } from '@/research-group/tests/fixtures';
import { DemandController } from '@/demand/demand.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from '@/infra/database/prisma.service';
import { DemandService } from '@/demand/demand.service';
import { UsersService } from '@/user/user.service';

describe('DemandService', () => {
  let service: DemandService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandController],
      providers: [DemandService, PrismaService, UsersService],
    }).compile();

    service = module.get<DemandService>(DemandService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const result = await service.findOne(mockDemand.id);

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

    await expect(service.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return all demands', async () => {
    jest.spyOn(prismaService.demand, 'findMany').mockResolvedValue(demands);

    const result = await service.all();

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

    await service.patch('some-id', { name: 'teste' });

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

    await expect(service.patch('some-id', { name: 'teste' })).rejects.toThrow();
  });
});
