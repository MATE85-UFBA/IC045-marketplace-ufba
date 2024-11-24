import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/infra/database/prisma.service';
import { AppModule } from '@/core/app.module';
import { UserRole } from '.prisma/client';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const testUser = {
    email: 'emailTesting123@email.com',
    password: 'password123',
  };
  const createdUserIds: string[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get(PrismaService);

    // Create test user
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        email: 'emailTesting123@email.com',
        name: 'Name for test',
        password: hashedPassword,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    createdUserIds.push(createdUser.id);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        id: {
          in: createdUserIds,
        },
      },
    });
    await app.close();
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
  });

  it('/auth/login (POST) - have expected attributes', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.body.access_token).toBeDefined();
    expect(response.body.access_token).not.toBeNull();
  });

  it('/auth/login (POST) - user not existent', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'wronguser',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
  });

  it('/auth/login (POST) - user existent but wrong passoword', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
  });

  it('/auth/login (POST) - Not providing informaiton', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: '',
        password: '',
      });

    expect(response.status).toBe(401);
  });
});
