import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('vanilla react')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);

  app.enableCors({
    origin: '*',
  });

  await app.listen(5000);
}

bootstrap();
