// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/user/user.service';
import { PrismaService } from '@/infra/database/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        UsersService,
        PrismaService,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return Invalid credentials when user not found', async () => {
      const mockBody = { username: 'test', password: 'test' };
      const response = await authController.login(mockBody);

      expect(response).toEqual({ message: 'Invalid credentials' });
    });

    it('should return jwt token when username and passwords matches', async () => {
      const mockBody = {
        username: 'luke.skywalker@email.com.br',
        password: 'senhasecreta',
      };
      const response = await authController.login(mockBody);
      expect(response).toEqual({ access_token: 'mockJwtToken' });
    });
  });
});
