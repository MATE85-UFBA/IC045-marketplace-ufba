import { PrismaService } from '@/infra/database/prisma.service';
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
}
