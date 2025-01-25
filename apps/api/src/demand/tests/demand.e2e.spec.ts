// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { PrismaService } from '@/infra/database/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/core/app.module';
import { JwtAuthGuard } from '@/auth/auth.guard';
import { Demand } from '@prisma/client';

describe.only('DemandController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let accessToken: string;
  let createdDemand: Demand;
  let userId: string;

  function createDemand(prismaService: PrismaService, companyId: string) {
    return prismaService.demand.create({
      data: {
        name: 'demand',
        description: 'abcde',
        link: 'https://example.com',
        company: {
          connect: {
            userId: companyId,
          },
        },
      },
    });
  }

  function deleteDemand(prismaService: PrismaService, demandId: string) {
    return prismaService.demand.delete({ where: { id: demandId } });
  }

  beforeAll(async () => {
    userId = '789e4567-e89b-12d3-a456-426614174000';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockImplementation((context) => {
          const req = context.switchToHttp().getRequest();
          req.user = { userId: userId };
          return true;
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = 'mock-access-token'; // Replace with a real token if necessary
    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    const company = await prismaService.company.findUnique({
      where: { userId },
    });
    if (!company) {
      await prismaService.company.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    createdDemand = await prismaService.demand.create({
      data: {
        name: 'New Demand',
        description: 'test description',
        link: 'https://example.com',
        company: {
          connect: {
            userId: userId,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/demand/all (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/demand/all');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/demand/:id (GET)', async () => {
    const demandId = createdDemand.id; // Replace with an actual ID if needed
    const response = await request(app.getHttpServer()).get(
      `/demand/${demandId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('New Demand');
    expect(response.body.link).toEqual('https://example.com');
  });

  it('/demand (POST)', async () => {
    const newDemand = {
      name: 'Test Demand',
      description: 'test description',
      link: 'https://example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/demand')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newDemand);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Test Demand');
    expect(response.body.link).toEqual('https://example.com');
  });

  it('/demand/:id (PATCH)', async () => {
    const demand = await createDemand(prismaService, userId);
    const updateData = {
      name: 'Updated Name',
      link: 'https://example.com/updated-link',
    };

    const response = await request(app.getHttpServer())
      .patch(`/demand/${demand.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.link).toBe(updateData.link);

    await deleteDemand(prismaService, demand.id);
  });

  it('/demand/:id (DELETE)', async () => {
    const demand = await createDemand(prismaService, userId);
    const response = await request(app.getHttpServer())
      .delete(`/demand/${demand.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200); // Or 404 if the item does not exist
  });

  afterAll(async () => {
    await prismaService.demand.delete({
      where: {
        id: createdDemand.id,
      },
    });

    await prismaService.$disconnect();
  });
});
