import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsOptional,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  started_at: Date;

  @IsOptional()
  @IsDate()
  finished_at?: Date;

  @IsNotEmpty()
  @IsUUID()
  researchGroupId: string;

  @IsNotEmpty()
  @IsUUID()
  demandId: string;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  started_at?: Date;

  @IsOptional()
  @IsDate()
  finished_at?: Date;

  @IsOptional()
  @IsUUID()
  researchGroupId?: string;

  @IsOptional()
  @IsUUID()
  demandId?: string;
}
