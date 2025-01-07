import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { User, UserRole, UserStatus } from '@prisma/client';
import { AppModule } from '@/core/app.module';
import { UpdateUserDto } from '@/user/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController (editUser)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  let testUser: User;
  let adminUser: Partial<User>;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      imports: [AppModule],
      providers: [AdminService, JwtService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = app.get<JwtService>(JwtService);
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();

    adminUser = {
      name: 'Administrador',
      email: 'administrador@email.com.br',
      role: UserRole.ADMIN,
      password: 'superadmin',
    };
    adminToken = jwtService.sign({
      sub: adminUser.id,
      name: adminUser.name,
      role: adminUser.role,
    });
    userToken = jwtService.sign({
      sub: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
      name: 'NVidia',
      role: UserRole.USER,
    });

    testUser = await prisma.user.create({
      data: {
        email: `${uuidv4()}@example.com`,
        name: 'Test User',
        password: 'password123',
        role: UserRole.USER,
        status: UserStatus.PENDING,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: testUser.id } });
    await app.close();
  });

  it('should update user successfully', async () => {
    const updatedUserData: UpdateUserDto = {
      status: UserStatus.APPROVED,
      role: UserRole.ADMIN,
    };

    const response = await request(app.getHttpServer())
      .patch(`/admin/users/${testUser.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: testUser.id,
      },
    });

    expect(updatedUser?.status).toBe(updatedUserData.status);
    expect(updatedUser?.role).toBe(updatedUserData.role);
  });

  it('should deny', async () => {
    const updatedUserData: UpdateUserDto = {
      status: UserStatus.APPROVED,
      role: UserRole.USER,
    };

    const response = await request(app.getHttpServer())
      .patch(`/admin/users/${testUser.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(updatedUserData);

    expect(response.status).toBe(403);
  });
});
