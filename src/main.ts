import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { registerSwagger } from './app/app.swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

void (async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  registerSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true, transform: true })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
})().catch(console.error);
