import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/config/exceptions/exceptions.module';
import { DatabaseServiceModule } from 'src/services/database/database-service.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseServiceModule, ExceptionsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
