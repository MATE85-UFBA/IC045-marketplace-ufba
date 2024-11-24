import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../infra/database/prisma.service';
import { UpdateUserDto } from '@/user/user.dto';
import { UserRole } from '@prisma/client';

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
      },
    ];
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    expect(await service.getUsers()).toEqual(users);
  });

  it('should edit user', async () => {
    const id = '1';
    const updatedUserData: UpdateUserDto = {
      email: 'john.doe@example.com',
      role: UserRole.ADMIN,
    };
    const updatedUser = {
      id,
      name: 'John Doe',
      email: updatedUserData.email || 'default@example.com',
      role: updatedUserData.role || UserRole.USER,
      img: null,
      password: 'password',
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

    expect(await service.editUser(id, updatedUserData)).toEqual({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
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
    };
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(deletedUser);

    expect(await service.deleteUser(id)).toEqual(deletedUser);
  });
});
