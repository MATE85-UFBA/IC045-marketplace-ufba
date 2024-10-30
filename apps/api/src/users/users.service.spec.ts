import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '@/infra/database/prisma.service'; // Import PrismaService
import { NotFoundException } from '@nestjs/common/exceptions';

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
      id: 1,
      nome: 'John Doe',
      img: 'image-url',
      email: 'john@example.com',
      senha: 'supposed to be encrypted',
      id_papel: 2
    };

    jest.spyOn(prismaService.tbUsuario, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findOne(1);
    
    expect(result).toEqual({
      id: mockUser.id,
      nome: mockUser.nome,
      img: mockUser.img,
      email: mockUser.email,
      id_papel: mockUser.id_papel,
    });
  });

  it('should throw NotFoundException when user is not found', async () => {
    jest.spyOn(prismaService.tbUsuario, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});

describe('Integration test with database - findOne', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let savedUserId: number;

  beforeAll(async () => {
    require('dotenv').config();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);

    const createdUser = await prismaService.tbUsuario.create({
      data: {
        nome: 'John Doe',
        img: 'https://example.com/johndoe.jpg',
        senha: 'encrypted-pass-hahaha',
        email: 'john@example.com',
        id_papel: 2,
      },
    });

    savedUserId = createdUser.id;
  });

  it('should return the user data when the user is found', async () => {
    const result = await service.findOne(savedUserId);
    expect(result.id).toEqual(savedUserId);
  });

  afterAll(async () => {
    await prismaService.tbUsuario.delete({
      where: {
        id: savedUserId,
      },
    });

    await prismaService.$disconnect();
  });
});