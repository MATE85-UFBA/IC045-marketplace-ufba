import { IsBooleanString, IsOptional } from 'class-validator';

export class FindResearcherDto {
  @IsBooleanString()
  @IsOptional()
  includeGroups: string;
}
