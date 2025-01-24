import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  public?: boolean;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  keywords?: string[];
}

export class SuggestDemandDTO {
  id: string;
  name: string;
  description: string;
}
