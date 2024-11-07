import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { hashPassword } from './utils/hashPassword.util';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userAlreadyExists) throw new ConflictException('Usuário já cadastrado');

    const hashedPassword = await hashPassword(user.password);

    const createdUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        img: user.img,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      img: createdUser.img,
      email: createdUser.email,
      role: createdUser.role,
    };
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return {
      id: user.id,
      name: user.name,
      img: user.img,
      email: user.email,
      role: user.role,
    };
  }

  async update(id: string, user: CreateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: user.name,
        img: user.img,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      img: updatedUser.img,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  }

  async delete(id: string) {
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });

    return {
      id: user.id,
      name: user.name,
      img: user.img,
      email: user.email,
      role: user.role,
    };
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
