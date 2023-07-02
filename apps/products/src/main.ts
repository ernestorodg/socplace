import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  
  const options = new DocumentBuilder()
    .setTitle('Socplace Products-Service')
    .setDescription('API Documentation')
    .build();
  // app.enableCors();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();