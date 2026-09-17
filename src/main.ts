import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configsData = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle("Api Clicks")
    .setDescription("Api for shortener URLs")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
 await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
