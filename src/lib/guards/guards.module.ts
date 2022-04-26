import { Global, Module } from '@nestjs/common';
import { RedisServiceModule } from 'src/services/database/redis-service.module';
import { GuardsService } from './guards.service';

@Global()
@Module({
  imports: [RedisServiceModule],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
