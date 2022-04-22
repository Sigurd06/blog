import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';

import * as entities from './domain/entities';
import { PgDatabaseService } from './pg-data.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({})],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PGHOST'),
          port: configService.get('PGPORT'),
          username: configService.get('PGUSER'),
          password: configService.get('PGPASSWORD'),
          database: configService.get('PGDATABASE'),
          logging: false,
          entities: Object.values(entities),
          synchronize: false,
        };
      },
    }),

    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  providers: [
    {
      provide: IDatabaseAbstract,
      useClass: PgDatabaseService,
    },
  ],
  exports: [IDatabaseAbstract],
})
export class PgDatabaseModule {}
