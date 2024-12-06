import { MailModule } from './../mailsend/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '@/user/user.service';
import { UsersModule } from '@/user/user.module';
import { PrismaService } from '@/infra/database/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '12h' },
    }),
    UsersModule,
    MailModule,
  ],
  providers: [PrismaService, AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
