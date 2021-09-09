import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle('Nodejs Bootstrap')
    .setDescription('Sample Nodejs + Nestjs + TypeOrm + MongoDB')
    .setVersion('1.0')
    .addTag('nodejs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);//swagger url: http://localhost:3000/api or json can be consumed on http://localhost:3000/api-json
  await app.listen(3000);
}
bootstrap();
