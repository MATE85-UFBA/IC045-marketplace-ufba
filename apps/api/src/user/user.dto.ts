import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  img?: string;

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class UpdateUserDto {
  name?: string;
  img?: string;
  email?: string;
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class ChangePasswordDto {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  // 8 or more characters, at least one uppercase letter, one lowercase letter, one number and one special character
  newPassword: string;

  @IsNotEmpty()
  oldPassword: string;
}
