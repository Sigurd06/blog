import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IRedisAbstract } from './core/abstracts/redis.abstracts';
import { RedisDatabseService } from './redis-data.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IRedisAbstract,
      useClass: RedisDatabseService,
    },
  ],
  exports: [IRedisAbstract],
})
export class RedisDatabaseModule {}
