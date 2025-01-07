// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });
import { PrismaService } from '@/infra/database/prisma.service';
import { UpdateUserDto } from '@/user/user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserRole, UserStatus } from '@prisma/client';
import { AdminService } from './admin.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthModule } from '@/auth/auth.module';

describe('Admin Service - System test', () => {
  let adminService: AdminService;
  let prisma: PrismaService;
  let testUser: User;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AdminService, PrismaService],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    prisma = module.get<PrismaService>(PrismaService);

    const myUUID = uuidv4();

    testUser = await prisma.user.create({
      data: {
        email: `${myUUID}@example.com`,
        name: 'Test User',
        password: 'password123',
      },
    });
  });

  afterAll(async () => {
    const user = await prisma.user.findUnique({
      where: { id: testUser.id },
      include: {
        researcher: true,
        company: true,
      },
    });

    if (user) {
      if (user.researcher) {
        await prisma.researcher.delete({
          where: { userId: user.researcher.userId },
        });
      }
      if (user.company) {
        await prisma.company.delete({ where: { userId: user.company.userId } });
      }
      await prisma.user.delete({ where: { id: testUser.id } });
    }
  });

  it('should update user successfully, simple attributes', async () => {
    const updateData: UpdateUserDto = {
      role: UserRole.ADMIN,
      status: UserStatus.APPROVED,
    };

    await adminService.editUser(testUser.id, updateData);

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });

    expect(updatedUser?.id).toEqual(testUser.id);
    expect(updatedUser?.role).toBe(UserRole.ADMIN);
    expect(updatedUser?.status).toBe(UserStatus.APPROVED);
  });

  it('should update user successfully, simple attributes overriding', async () => {
    const updateData: UpdateUserDto = {
      role: UserRole.ADMIN,
      status: UserStatus.BLOCK,
    };

    await adminService.editUser(testUser.id, updateData);

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });
    expect(updatedUser?.status).toBe(UserStatus.BLOCK);
  });
});
