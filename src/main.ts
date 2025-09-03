/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🔍 process.env.DB_TYPE:', process.env.DB_TYPE);
  console.log('🔍 process.env.DB_HOST:', process.env.DB_HOST);
  console.log('🔍 process.env.DB_USERNAME:', process.env.DB_USERNAME);
  console.log('🔍 process.env.DB_DATABASE:', process.env.DB_DATABASE);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
