import { IsNotEmpty } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  public?: boolean;

  links?: string;

  keywords: string[];
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;

  keywords?: string[];
}
