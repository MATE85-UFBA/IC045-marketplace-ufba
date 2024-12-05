import { UserService } from '@/user/user.service';
import { getUserType } from '@/user/utils/user.types.util';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user?.status === UserStatus.BLOCK)
      throw new UnauthorizedException('Usuário bloqueado.');

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Usuário ou senha incorretos.');
  }

  async login(user: any) {
    const utype = getUserType(user);

    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };
    return {
      id: user.id,
      name: user.name,
      img: user.img,
      utype: utype,
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
