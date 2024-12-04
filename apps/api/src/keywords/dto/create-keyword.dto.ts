import { IsNotEmpty } from 'class-validator';

export class CreateKeywordDto {
  @IsNotEmpty()
  name: string;
}
