import { IsNotEmpty, IsUrl, IsUUID, IsString, IsOptional, IsArray } from "class-validator";

export class CreateResearchGroupDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;


    @IsUrl()
    urlCNPQ?: string;


    @IsString()
    img?: string;

    @IsNotEmpty()
    @IsUUID()
    researcherId: string;


    @IsArray()
    @IsUUID("all", { each: true })
    knowledgeAreas?: string[];


    @IsArray()
    @IsUUID("all", { each: true })
    members?: string[];


    @IsArray()
    @IsUUID("all", { each: true })
    projects?: string[];
}

export class UpdateResearchGroupDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    urlCNPQ?: string;

    @IsOptional()
    @IsUrl()
    img?: string;

    @IsOptional()
    @IsUUID()
    researcherId?: string;

    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true })
    knowledgeAreas?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true })
    members?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true })
    projects?: string[];
}
