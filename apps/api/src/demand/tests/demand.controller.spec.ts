import { Test, TestingModule } from '@nestjs/testing';
import { DemandController } from '@/demand/demand.controller';
import { DemandService } from '@/demand/demand.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UserService } from '@/user/user.service';
import { UserRole, UserStatus } from '@prisma/client';

describe('DemandController', () => {
  let controller: DemandController;
  let prismaService: PrismaService;
  let demandService: DemandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemandController],
      providers: [DemandService, PrismaService, UserService],
    }).compile();

    controller = module.get<DemandController>(DemandController);
    prismaService = module.get<PrismaService>(PrismaService);
    demandService = module.get<DemandService>(DemandService);
  });

  it('has create method', () => {
    expect(controller.create).toBeDefined();
  });

  it('should not create demand if user does not have company', async () => {
    const mockUser = {
      id: '94b6ce74-3e80-4968-8956-7d812f4a295a',
      name: 'John Doe',
      img: 'image-url',
      email: 'john@example.com',
      password: 'supposed to be encrypted',
      role: UserRole.ADMIN,
      resetToken: 'reset token example',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: UserStatus.APPROVED,
    };

    jest.spyOn(demandService, 'create');
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    await expect(
      controller.create(
        { name: 'demanda', description: 'test description' },
        { user: { userId: 'some-id' } },
      ),
    ).rejects.toThrow('Usuário não existe ou não há empresa associada.');

    expect(demandService.create).toHaveBeenCalledTimes(0);
  });

  it('has delete method', () => {
    expect(controller.delete).toBeDefined();
  });

  it('has patch method', () => {
    expect(controller.patch).toBeDefined();
  });

  it('has all method', () => {
    expect(controller.all).toBeDefined();
  });

  it('has findOne method', () => {
    expect(controller.findOne).toBeDefined();
  });
});
