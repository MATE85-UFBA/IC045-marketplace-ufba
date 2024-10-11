import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {};

    async create(user: CreateUserDto) {
        const createdUser = await this.prismaService.tbUsuario.create({
            data: {
                nome: user.nome,
                img: user.img,
                email: user.email,
                senha: user.senha,
                id_papel: user.id_papel
            }
        })

        return {
            id: createdUser.id,
            nome: createdUser.nome,
            img: createdUser.img,
            email: createdUser.email,
            id_papel: createdUser.id_papel
        }
    }
}