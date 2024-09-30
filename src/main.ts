import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { CORS } from './constants'
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);

  //app.setGlobalPrefix('api'); //Se define prefijo para el uso de las apis
  const configService = app.get(ConfigService);

  //Cors de la api
  app.enableCors(CORS);

  //app.use(csurf());

  //Permite instanciar la clase ValidationPipe, para la validación de los DTO
  app.useGlobalPipes( new ValidationPipe(
  {
    transform:true,
    transformOptions:
    {
      enableImplicitConversion:true
    },
    whitelist:true,
    forbidNonWhitelisted: true,
  }));

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));

  //Se prepara la información para documentar la API, y para esto se usa swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Documentanción de la API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('PORT_APP'));
  console.log('Aplicación ejecutandose en el puerto: '+configService.get('PORT_APP'))
}
bootstrap();
