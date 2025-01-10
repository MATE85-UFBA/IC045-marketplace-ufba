import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProjectDto {
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

export class UpdateProjectDto {
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
