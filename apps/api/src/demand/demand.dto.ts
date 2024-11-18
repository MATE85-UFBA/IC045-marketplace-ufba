import { IsNotEmpty } from 'class-validator';

export class CreateDemandDTO {
  @IsNotEmpty()
  name: string;
}

export class UpdateDemandDTO {
  name: string;
}
