import { UsersService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const payload = { email };
      this.jwtService.sign(payload, {
        secret: process.env.JWT_PASSWORD_TOKEN_SECRET,
        expiresIn: process.env.JWT_PASSWORD_TOKEN_EXPIRATION,
      });
      // TODO send email with token

      return { message: 'Password reset email sent' };
    }
    return { message: 'Invalid email' };
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_PASSWORD_TOKEN_SECRET,
      });

      const user = await this.usersService.findByEmail(payload.email);

      if (user) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        await this.usersService.updatePassword(user.id, hashedPassword);

        return { message: 'Password has been reset' };
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
