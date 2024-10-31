import { Test, TestingModule } from '@nestjs/testing';

import { UsersRoles } from '@prisma/client';
import { PrismaService } from '@/infra/database/prisma.service'; // Import PrismaService
import { NotFoundException } from '@nestjs/common/exceptions';
import { UsersService } from '@/users/users.service';

describe('Integration test - UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService], // Add PrismaService to providers
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('Integration test - UsersService - findOne', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return user data when user is found', async () => {
    const mockUser = {
      id: '94b6ce74-3e80-4968-8956-7d812f4a295a',
      name: 'John Doe',
      img: 'image-url',
      email: 'john@example.com',
      password: 'supposed to be encrypted',
      role: UsersRoles.ADMIN,
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(prismaService.tbUsers, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findOne(mockUser.id);

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      img: mockUser.img,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(prismaService.tbUsers, 'findUnique').mockResolvedValue(null);

    await expect(
      service.findOne('94b6ce74-3d55-4968-8956-7d812f4a295a'),
    ).rejects.toThrow(NotFoundException);
  });
});

describe('Integration test with database - findOne', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let savedUserId: string;

  beforeAll(async () => {
    require('dotenv').config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdUser = await prismaService.tbUsers.create({
      data: {
        name: 'John Doe',
        img: 'https://example.com/johndoe.jpg',
        password: 'encrypted-pass-hahaha',
        email: 'john@example.com',
        role: UsersRoles.ADMIN,
      },
    });

    savedUserId = createdUser.id;
  });

  it('should return the user data when the user is found', async () => {
    const result = await service.findOne(savedUserId);
    expect(result.id).toEqual(savedUserId);
  });

  afterAll(async () => {
    await prismaService.tbUsers.delete({
      where: {
        id: savedUserId,
      },
    });

    await prismaService.$disconnect();
  });
});
