import { Module } from '@nestjs/common';
import { RedisDatabaseModule } from 'src/frameworks/database/redis/redis-data.module';

@Module({
  imports: [RedisDatabaseModule],
  exports: [RedisDatabaseModule],
})
export class RedisServiceModule {}
