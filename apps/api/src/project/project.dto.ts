import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsOptional,
  IsISO8601,
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
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
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
}
