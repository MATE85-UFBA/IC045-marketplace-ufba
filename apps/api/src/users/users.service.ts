import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {};

    async create(user: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(user.senha, 10);

        const createdUser = await this.prismaService.tbUsuario.create({
            data: {
                nome: user.nome,
                img: user.img,
                email: user.email,
                senha: hashedPassword,
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

    async findOne(id: number) {
        const user = await this.prismaService.tbUsuario.findUnique({
            where: {
                id: +id
            }
        })

        if(!user) throw new NotFoundException("Usuário não encontrado");

        return {
            id: user.id,
            nome: user.nome,
            img: user.img,
            email: user.email,
            id_papel: user.id_papel
        }
    }

    async update(id: number, user: CreateUserDto) {
        const updatedUser = await this.prismaService.tbUsuario.update({
            where: {
                id: +id
            },
            data: {
                nome: user.nome,
                img: user.img,
                email: user.email,
                senha: user.senha,
                id_papel: user.id_papel
            }
        })

        return {
            id: updatedUser.id,
            nome: updatedUser.nome,
            img: updatedUser.img,
            email: updatedUser.email,
            id_papel: updatedUser.id_papel
        }
    }

    async delete(id: number) {
        const user = await this.prismaService.tbUsuario.delete({
            where: {
                id: +id
            }
        })

        return {
            id: user.id,
            nome: user.nome,
            img: user.img,
            email: user.email,
            id_papel: user.id_papel
        }
    }
}
