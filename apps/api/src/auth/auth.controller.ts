import {
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDTO, ResetPasswordDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Body() body: ResetPasswordDTO,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(token, body.password);
  }
}
