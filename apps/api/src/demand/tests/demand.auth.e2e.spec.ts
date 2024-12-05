

import { v4} from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, NotFoundException} from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { DemandController } from '@/demand/demand.controller';
import { DemandService } from '@/demand/demand.service';
import { UserService } from '@/user/user.service';
import { AuthModule } from '@/auth/auth.module';
import { User, UserRole, UserStatus } from '@prisma/client';


describe('DemandController (e2e)', () => {

  let app: INestApplication;
  let jwtService: JwtService;
  let demandService: Partial<DemandService>;
  let userService: Partial<UserService>;
  let token: string;
  let user: User;
  let userDemandOwner: {id: string, name: string, email:string, company: {} | null}
  let userDemandOwnerToken: string;

  beforeAll(async () => {

    require('dotenv').config({ path: ['.env', '.env.ci'] });
    demandService = {
      my: jest.fn().mockResolvedValue([
        { id: 'demand-1', title: 'Demand 1', ownerId: 'mock-user-id' },
        { id: 'demand-2', title: 'Demand 2', ownerId: 'mock-user-id' },
      ]),
      findOne: jest.fn()
      .mockImplementationOnce((id: string) => {
        if (id != "1") {
          throw new NotFoundException(`id ${id} not found`);
        } else {
          return {id: "1", name: "demand 1", description: "desc", status: "CREATED", public: true};
        }

      }),
      findOneIncludingPrivate: jest.fn()
        .mockImplementationOnce((id: string) => {
          return {id: "2", name: "demand 2", description: "desc", status: "CREATED", public: true};
        }),
    };
    
    user = {
      name: "User test",
      id: v4().toString(),
      email: `${v4().toString()}@email.com`,
      img: null,
      password: "userPass",
      status: UserStatus.APPROVED,
      role: UserRole.USER,
      resetToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    userDemandOwner = {
      name: "name",
      id: v4().toString(),
      email: `${v4().toString()}@email.com`,
      company: null
    };

    const company = {
      userId: userDemandOwner.id,
      demands: [{id: "1", name: "demand 1", description: "desc", status: "CREATED", public: true}],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    userDemandOwner.company = company

    // Mock UsersService
    userService = {
      findOne: jest.fn().mockResolvedValue({...user}),
    };
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [DemandController],
      imports: [AuthModule],
      providers: [
        { provide: DemandService, useValue: demandService },
        { provide: UserService, useValue: userService },
        JwtService, // Real JwtService
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = app.get<JwtService>(JwtService); // Retrieve JwtService from context
    await app.init();

    token = jwtService.sign({ sub: user.id, name: user.name, role: user.role });
    userDemandOwnerToken = jwtService.sign({ sub: userDemandOwner.id, name: userDemandOwner.name, role: 'USER' });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/demand/my (GET) with token', async () => {
    const response = await request(app.getHttpServer())
      .get('/demand/my')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual([
      { id: 'demand-1', title: 'Demand 1', ownerId: 'mock-user-id' },
      { id: 'demand-2', title: 'Demand 2', ownerId: 'mock-user-id' },
    ]);
  });

  it('/demand/my (GET) without token should deny', async () => {
    await request(app.getHttpServer())
      .get('/demand/my')
      .expect(401);
  });

  it('/:id (GET) non public demand without token - expect not found', async () => {

    await request(app.getHttpServer())
        .get(`/demand/2`)
        .expect(404);
  });

  it('/:id (GET) one public demand - should return ok', async () => {

    await request(app.getHttpServer())
      .get(`/demand/1`)
      .expect(200);

  });

  it('/:id (GET) one non public without token - forbidden', async () => {

    await request(app.getHttpServer())
      .get(`/demand/private/2`)
      .expect(401);
  });

  it('/:id (GET) one non public demand with access', async () => {

    await request(app.getHttpServer())
      .get(`/demand/private/2`)
      .set('Authorization', `Bearer ${userDemandOwnerToken}`)
      .expect(200);
  });

});