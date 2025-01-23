import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  public?: boolean;

  @IsUrl()
  link?: string;

  keywords?: string[];
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  @IsUrl()
  link?: string;

  keywords?: string[];
}

export class SuggestDemandDTO {
  id: string;
  name: string;
  description: string;
}
