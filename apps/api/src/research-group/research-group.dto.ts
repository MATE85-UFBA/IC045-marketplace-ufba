import {
  IsNotEmpty,
  IsUrl,
  IsUUID,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateResearchGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  urlCNPQ?: string;

  @IsOptional()
  @IsString()
  img?: string;

  @IsNotEmpty()
  @IsUUID()
  researcherId: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  knowledgeAreas?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  members?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  competences?: string[];
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
  @IsUUID('all', { each: true })
  knowledgeAreas?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  members?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  competences?: string[];
}
