import { Global, Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { GuardsService } from './guards.service';

@Global()
@Module({
  imports: [RedisModule],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
