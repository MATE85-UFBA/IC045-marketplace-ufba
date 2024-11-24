import { Transform } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsOptional } from 'class-validator';

export class FindResearcherDto {
  @IsBooleanString()
  @IsOptional()
  includeGroups: string;
}
