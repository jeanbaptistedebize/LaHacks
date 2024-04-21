import { AppModule } from 'app.module';
import * as cookieParser from 'cookie-parser';
import { writeFileSync } from 'fs';
import { join } from 'path';
import RedisCacheService from 'redis/redis.service';
import { BACKEND_PORT, FRONTEND_PORT, FRONTEND_URL, MODE } from 'setup';
import * as bodyParser from 'body-parser';

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { json } from 'body-parser';

function buildSwagger(
  app: INestApplication,
  config: Omit<OpenAPIObject, 'paths'>,
) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document));
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));

  if (MODE === 'dev') {
    const config = new DocumentBuilder()
      .setTitle('Template API')
      .setDescription('So insane API')
      .setVersion('1.0')
      .addCookieAuth('session')
      .build();

    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
    buildSwagger(app, config);
    Logger.debug(`Swagger available at http://localhost:${BACKEND_PORT}/api`);
  }

  await RedisCacheService.connect();
  Logger.debug('Redis Connected!');

  app.enableCors({
    origin: [`${FRONTEND_URL}:${FRONTEND_PORT}`, `*`],
    credentials: true,
    allowedHeaders: 'Content-Type',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  });
  app.use(json({ limit: '50mb' }));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(BACKEND_PORT);
}

bootstrap();
