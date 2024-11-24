import { IsNotEmpty } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateDemandDTO {
  name: string;
  description: string;
}
