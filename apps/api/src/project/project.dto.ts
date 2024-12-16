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
  @IsISO8601()
  started_at: Date;

  @IsOptional()
  @IsISO8601()
  finished_at?: Date;

  @IsNotEmpty()
  @IsUUID()
  researchGroupId: string;

  @IsOptional()
  @IsUUID()
  demandId: string;

  keywords?: string[];
}

export class UpdateProjectDto {
  @IsString()
  name?: string;
  @IsISO8601()
  started_at?: Date;

  @IsOptional()
  @IsISO8601()
  finished_at?: Date;

  @IsOptional()
  @IsUUID()
  researchGroupId?: string;

  @IsOptional()
  @IsUUID()
  demandId?: string;

  keywords?: string[];
}
