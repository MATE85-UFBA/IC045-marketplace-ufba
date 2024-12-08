import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { UpdateUserDto } from '../user/user.dto';
import { UserRole, UserStatus } from '@prisma/client';
import * as UserTypes from '@/user/utils/user.types.util';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            getUsers: jest.fn(),
            editUser: jest.fn(),
            deleteUser: jest.fn(),
            getEntityCounts: jest.fn(),
            getDemandsByCompany: jest.fn(),
            getDemandsByResearchGroup: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should get users', async () => {
    const users = [
      {
        id: '1',

        name: 'John',

        email: 'john@example.com',

        role: UserRole.USER,

        img: null,

        password: 'password',

        status: UserStatus.APPROVED,

        utype: UserTypes.COMPANY,

        resetToken: null,

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'getUsers').mockResolvedValue(users);

    expect(await controller.getUsers()).toEqual(users);
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
      email: updatedUserData.email!,
      role: updatedUserData.role!,
      img: null,
      password: 'password',
      isApproved: true,
      isBlocked: false,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'editUser').mockResolvedValue(updatedUser);

    expect(await controller.editUser(id, updatedUserData)).toEqual(updatedUser);
  });

  it('should delete user', async () => {
    const id = '1';
    const deletedUser = {
      id,
      name: 'John',
      email: 'john@example.com',
      role: UserRole.USER,
      img: null,
      password: 'password',
      status: UserStatus.APPROVED,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'deleteUser').mockResolvedValue(deletedUser);

    expect(await controller.deleteUser(id)).toEqual(deletedUser);
  });

  it('should get entity counts', async () => {
    const entityCounts = {
      companies: 5,
      researchers: 10,
      researchGroups: 3,
      demands: 20,
    };
    jest.spyOn(service, 'getEntityCounts').mockResolvedValue(entityCounts);

    expect(await controller.getEntityCounts()).toEqual(entityCounts);
  });

  it('should get demands by company', async () => {
    const demandsByCompany = [
      {
        companyId: '1',
        _count: { id: 5 },
      },
      {
        companyId: '2',
        _count: { id: 3 },
      },
    ];
    jest
      .spyOn(service, 'getDemandsByCompany')
      .mockResolvedValue(demandsByCompany);

    expect(await controller.getDemandsByCompany()).toEqual(demandsByCompany);
  });

  it('should get demands by research group', async () => {
    const demandsByResearchGroup = [
      {
        id: '1',
        name: 'Group 1',
        _count: { projects: 2 },
      },
      {
        id: '2',
        name: 'Group 2',
        _count: { projects: 4 },
      },
    ];
    jest
      .spyOn(service, 'getDemandsByResearchGroup')
      .mockResolvedValue(demandsByResearchGroup);

    expect(await controller.getDemandsByResearchGroup()).toEqual(
      demandsByResearchGroup,
    );
  });
});
