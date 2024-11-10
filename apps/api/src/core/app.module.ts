import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { UsersModule } from '@/user/user.module';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, JwtService],
  exports: [AppService],
})
export class AppModule {}
