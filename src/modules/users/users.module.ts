import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { DatabaseServiceModule } from 'src/services/database/database-service.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseServiceModule, ExceptionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
