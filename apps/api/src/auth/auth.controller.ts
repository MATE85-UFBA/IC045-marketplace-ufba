import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResetPasswordDTO, ForgotPasswordDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email: email, password } = body;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password/:token')
  @HttpCode(200)
  async resetPassword(
    @Body() body: ResetPasswordDTO,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(token, body.password);
  }
}
