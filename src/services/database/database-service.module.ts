import { Module } from '@nestjs/common';
import { PgDatabaseModule } from 'src/frameworks/database/pg/pg-data.module';

@Module({
  imports: [PgDatabaseModule],
  exports: [PgDatabaseModule],
})
export class DatabaseServiceModule {}
