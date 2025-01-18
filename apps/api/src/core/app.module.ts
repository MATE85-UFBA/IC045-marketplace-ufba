import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { UsersModule } from '@/user/user.module';
import { AuthService } from '@/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { DemandModule } from '@/demand/demand.module';
import { AdminModule } from '@/admin/admin.module';
import { ProjectModule } from '@/project/project.module';
import { ResearchGroupsModule } from '@/research-group/research-group.module';
import { ResearchersModule } from '@/researchers/researchers.module';
import { MailModule } from '@/mailsend/mail.module';
import { KeywordsModule } from '@/keywords/keywords.module';
import { CompanyModule } from '@/company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    DemandModule,
    AdminModule,
    ProjectModule,
    ResearchGroupsModule,
    ResearchersModule,
    MailModule,
    KeywordsModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, JwtService],
  exports: [AppService],
})
export class AppModule {}
