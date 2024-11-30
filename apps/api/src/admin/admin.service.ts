import { PrismaService } from '@/infra/database/prisma.service';
import { UpdateUserDto } from '@/user/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async editUser(id: string, updatedUserData: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updatedUserData,
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
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

    return{
      companies,
      researchers,
      researchGroups,
      demands
    }
  
  }

  async getDemandsByCompany() {
    return this.prismaService.demand.groupBy({
      by: ['companyId'],
      _count: {
        id: true,
      },
    });
  }
}
