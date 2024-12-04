require('dotenv').config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/core/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './middleware/global.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Marketplace UFBA')
    .setDescription('API documentation for My Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    origin: '*',
    // methods: ['GET', 'POST', 'DELETE'],
    // credentials: true,
  });

  const serverPort = process.env.SERVER_PORT || 8080;
  await app.listen(serverPort);
}
bootstrap();