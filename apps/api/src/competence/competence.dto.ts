import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompetenceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  researchGroupId: string;

  @IsOptional()
  @IsUUID()
  demandId: string;

  keywords?: string[];
}

export class UpdateCompetenceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  researchGroupId?: string;

  @IsOptional()
  @IsUUID()
  demandId?: string;

  keywords?: string[];
}
