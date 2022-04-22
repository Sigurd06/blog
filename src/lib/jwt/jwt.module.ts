import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { RedisModule } from '../redis/redis.module';
import { JWTService } from './jwt.service';

@Module({
  imports: [RedisModule, ConfigModule, ExceptionsModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
