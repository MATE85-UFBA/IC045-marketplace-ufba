import { IsEmail, Matches } from 'class-validator';

class ResetPasswordDTO {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
}

class ForgotPasswordDTO {
  @IsEmail()
  email: string;
}

export { ResetPasswordDTO, ForgotPasswordDTO };
