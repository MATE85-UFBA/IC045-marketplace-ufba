import { Test, TestingModule } from '@nestjs/testing';

import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
dotenv.config();

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
      const mockBody = { username: 'joao', password: '123456' };
      const response = await authController.login(mockBody);

      expect(response).toEqual({ access_token: 'mockJwtToken' });
    });
  });
});
