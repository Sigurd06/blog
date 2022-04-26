import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { RedisServiceModule } from 'src/services/database/redis-service.module';

import { JWTService } from './jwt.service';

@Module({
  imports: [RedisServiceModule, ConfigModule, ExceptionsModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
