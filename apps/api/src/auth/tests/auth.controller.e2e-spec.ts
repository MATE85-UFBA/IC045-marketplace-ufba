// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/core/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const nonProfileUser: { email: string; password: string } = {
    email: 'maria.bethania@email.com.br',
    password: 'superpassword',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: nonProfileUser.email,
        password: nonProfileUser.password,
      });

    expect(response.status).toBe(200);
  });

  it('/auth/login (POST) - have expected attributes', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: nonProfileUser.email,
        password: nonProfileUser.password,
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
        email: nonProfileUser.email,
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

  it('/auth/login (POST) - Expect researcher profile user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'fred.durao@email.com.br',
        password: 'senhaufba',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('utype', 'RESEARCHER');
  });
  it('/auth/login (POST) - Student user, Expect RESEARCHER profile user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'anakin.skywalker@email.com.br',
        password: 'senhastarwars',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('utype', 'RESEARCHER');
  });
  it('/auth/login (POST) - Expect company profile user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'atendimento@coelba.com.br',
        password: 'supercoelba',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('utype', 'COMPANY');
  });
});
