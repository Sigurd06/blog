import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Tedis } from 'tedis';
import { IRedisAbstract } from './core/abstracts/redis.abstracts';
import { RedisGenericRepository } from './repositories/generic-redis.repository';

@Injectable()
export class RedisDatabseService
  implements IRedisAbstract, OnApplicationBootstrap
{
  private readonly logger: Logger = new Logger('Redis');
  private tedis: Tedis;

  public redisJWT: RedisGenericRepository;

  constructor(config: ConfigService) {
    this.tedis = new Tedis({
      host: config.get<string>('REDIS_HOST'),
      port: config.get<number>('REDIS_PORT'),
    });
    this.logger.log('Redis connection established');
  }

  public onApplicationBootstrap() {
    this.redisJWT = new RedisGenericRepository(this.tedis);
  }
}
