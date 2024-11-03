import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { UsersRoles } from '@prisma/client';
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

  @IsEnum(UsersRoles)
  role: UsersRoles;
}

export class UpdateUserDto {
  name?: string;
  img?: string;
  email?: string;
  password?: string;
  @IsEnum(UsersRoles)
  role?: UsersRoles;
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
