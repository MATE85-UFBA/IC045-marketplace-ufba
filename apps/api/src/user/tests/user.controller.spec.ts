import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@/infra/database/prisma.service';
import { UsersController } from '../user.controller';
import { UserService } from '../user.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UserService, PrismaService], // Moved PrismaService to providers
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
