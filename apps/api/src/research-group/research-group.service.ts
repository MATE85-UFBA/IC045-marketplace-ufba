import { PrismaService } from '@/infra/database/prisma.service';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateResearchGroupDto } from './research-group.dto';

@Injectable()
export class ResearchGroupService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(group: CreateResearchGroupDto) {
        const groupAlreadyExists = await this.prismaService.researchGroup.findUnique({
            where: {
                name: group.name,
            },
        });
        if (groupAlreadyExists) throw new ConflictException('Grupo de pesquisa já cadastrado');

        const createdGroup = await this.prismaService.researchGroup.create({
            data: {
                name: group.name,
                description: group.description,
                urlCNPQ: group.urlCNPQ,
                img: group.img,
                researcherId: group.researcherId,
            },
        });

        return {
            id: createdGroup.id,
            name: createdGroup.name,
            description: createdGroup.description,
            urlCNPQ: createdGroup.urlCNPQ,
            img: createdGroup.img,
            researcherId: createdGroup.researcherId,
        };
    }

    async findOne(id: string) {
        const group = await this.prismaService.researchGroup.findUnique({
            where: {
                id: id,
            },
        });

        if (!group) throw new NotFoundException('Grupo de pesquisa não encontrado');

        return {
            id: group.id,
            name: group.name,
            description: group.description,
            urlCNPQ: group.urlCNPQ,
            img: group.img,
            researcherId: group.researcherId,
        };
    }

    async update(id: string, group: CreateResearchGroupDto) {
        const updatedGroup = await this.prismaService.researchGroup.update({
            where: {
                id: id,
            },
            data: {
                name: group.name,
                description: group.description,
                urlCNPQ: group.urlCNPQ,
                img: group.img,
                researcherId: group.researcherId,
            },
        });

        return {
            id: updatedGroup.id,
            name: updatedGroup.name,
            description: updatedGroup.description,
            urlCNPQ: updatedGroup.urlCNPQ,
            img: updatedGroup.img,
            researcherId: updatedGroup.researcherId,
        };
    }

    async delete(id: string) {
        const group = await this.prismaService.researchGroup.delete({
            where: {
                id: id,
            },
        });

        return {
            id: group.id,
            name: group.name,
            description: group.description,
            urlCNPQ: group.urlCNPQ,
            img: group.img,
            researcherId: group.researcherId,
        };
    }

    async findByName(name: string) {
        return await this.prismaService.researchGroup.findUnique({
            where: {
                name,
            },
        });
    }
}
