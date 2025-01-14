import { getUserType } from '@/user/utils/user.types.util';
import { PrismaService } from '../infra/database/prisma.service';
import { UpdateUserDto } from '../user/user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        img: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        resetToken: true,
        company: true,
        researcher: true,
      },
      orderBy: [
        {
          status: 'desc',
        },
      ],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      img: user.img,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      resetToken: user.resetToken,
      utype: getUserType(user),
    }));
  }

  async editUser(userId: string, updateUserDto: UpdateUserDto) {
    const { role, status } = updateUserDto;

    const data: Partial<User> = {
      role,
      status,
    };

    await this.prismaService.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  // Dashboard methods
  async getEntityCounts() {
    const researchers = await this.prismaService.researcher.count();
    const companies = await this.prismaService.company.count();
    const researchGroups = await this.prismaService.researchGroup.count();
    const demands = await this.prismaService.demand.count();

    return {
      companies,
      researchers,
      researchGroups,
      demands,
    };
  }

  async getDemandsByCompany() {
    return this.prismaService.demand.groupBy({
      by: ['companyId'],
      _count: {
        id: true,
      },
    });
  }

  async getDemandsByResearchGroup() {
    return await this.prismaService.researchGroup.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            competences: true,
          },
        },
      },
    });
  }
}
