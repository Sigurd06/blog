import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { GuardsModule } from 'src/lib/guards/guards.module';
import { JWTModule } from 'src/lib/jwt/jwt.module';

import { DatabaseServiceModule } from 'src/services/database/database-service.module';
import { RedisServiceModule } from 'src/services/database/redis-service.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseServiceModule,
    ExceptionsModule,
    RedisServiceModule,
    JWTModule,
    GuardsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
