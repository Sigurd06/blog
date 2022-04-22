import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Blog Service')
      .setVersion('v0.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/blog/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
