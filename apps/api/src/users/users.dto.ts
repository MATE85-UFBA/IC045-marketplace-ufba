import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()   
    nome: string;

    img?: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    senha: string;

    id_papel: number;
}

export class UpdateUserDto {
    nome?: string;
    img?: string;
    email?: string;
    senha?: string;
    id_papel?: number;
}