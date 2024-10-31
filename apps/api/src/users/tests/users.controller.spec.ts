import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/infra/database/prisma.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/core/app.module';
import { CreateUserDto } from '../users.dto';

describe('UsersController - Intances', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService, PrismaService], // Moved PrismaService to providers
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('UsersController - CRUD - End2End', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authToken: string;
  let testUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);

    const setupUser: CreateUserDto = {
      name: 'Setup User', 
      email: 'setup@example.com', password: 'password',
      role: 'USER'
    };
    const createdUser = await usersService.create(setupUser);
    testUserId = createdUser.id;

    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: setupUser.email, password: setupUser.password });
    authToken = authResponse.body.token;
  });

  it('/users (POST) should create a new user', async () => {
    const newUser: CreateUserDto = {
      name: 'Random User',
      email: `random${Math.floor(Math.random() * 10000)}@example.com`,
      password: 'password',
      role: 'USER'
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('/users/:id (GET) should get the setup user', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${testUserId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', testUserId);
    expect(response.body).toHaveProperty('name', 'Setup User');
    expect(response.body).toHaveProperty('email', 'setup@example.com');
  });

  afterAll(async () => {
    await usersService.delete(testUserId);
    await app.close();
  });
});
