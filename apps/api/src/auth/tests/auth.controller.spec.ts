// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ['.env.ci', '.env'] });

import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/user/user.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { MailService } from '@/mailsend/mail.service';

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
        MailService,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return Invalid credentials when user not found', async () => {
      const mockBody = { email: 'test', password: 'test' };
      await expect(authController.login(mockBody)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return jwt token when username and passwords matches', async () => {
      const mockBody = {
        email: 'luke.skywalker@email.com.br',
        password: 'senhasecreta',
      };
      const response = await authController.login(mockBody);
      expect(response.access_token).toBe('mockJwtToken');
    });
  });
});
