import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseServiceModule } from './services/database/database-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
