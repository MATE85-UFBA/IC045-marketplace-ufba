import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()   
    nome: string;

    img?: string;
    
    @IsEmail()
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
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