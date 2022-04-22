import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './config/filter';
import { LoggingInterceptor } from './config/interceptors/logger';
import { ResponseInterceptor } from './config/interceptors/response';
import { TimeoutInterceptor } from './config/interceptors/timeout';
import { LoggerService } from './config/logger/logger.service';
import { SwaggerConfig } from './config/swagger/swagger';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new LoggerService();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.setGlobalPrefix('api/v1/blog/');

  SwaggerConfig.ConfigSwaggerModule(app);

  await app.listen(3000);
}
bootstrap();
