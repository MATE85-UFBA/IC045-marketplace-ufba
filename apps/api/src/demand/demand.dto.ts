import { IsNotEmpty } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  public?: boolean;
}

export class UpdateDemandDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  description?: string;
}
