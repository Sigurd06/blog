import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { GuardsModule } from 'src/lib/guards/guards.module';
import { JWTModule } from 'src/lib/jwt/jwt.module';
import { RedisModule } from 'src/lib/redis/redis.module';
import { DatabaseServiceModule } from 'src/services/database/database-service.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseServiceModule,
    ExceptionsModule,
    RedisModule,
    JWTModule,
    GuardsModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
