import { PrismaService } from '@/infra/database/prisma.service';
import { UpdateUserDto } from '@/users/users.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUsers() {
        return await this.prismaService.user.findMany({
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

        return{
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        }
    }

    async deleteUser(id: string) {
        return await this.prismaService.user.delete({
            where: { id },
        });
    }
}
