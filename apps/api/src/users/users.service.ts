import { PrismaService } from '@/infra/database/prisma.service';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { hashPassword, comparePassword } from './utils/hashPassword.util';

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

  async updatePassword(id: string, password: string) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
        resetToken: null,
      },
    });
  }

  async changePassword(id: string, data: { oldPassword: string; newPassword: string }) {
    const { oldPassword, newPassword } = data;

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if(!user) throw new NotFoundException('Usuário não encontrado');

    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) throw new ForbiddenException('Senha inválida');

    const hashedPassword = await hashPassword(newPassword);
    return await this.updatePassword(id, hashedPassword);
  }
}
