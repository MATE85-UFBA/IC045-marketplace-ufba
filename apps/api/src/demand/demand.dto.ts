import { IsNotEmpty } from 'class-validator';

export class DemandDTO {
  @IsNotEmpty()
  titulo: string;

  links?: string;

  @IsNotEmpty()
  descricao: string;
}
