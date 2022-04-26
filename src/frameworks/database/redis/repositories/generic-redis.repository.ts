import { Logger } from '@nestjs/common';
import { Tedis } from 'tedis';
import { IGenericRedisService } from '../core/abstracts/generic-redis.abstract';

export class RedisGenericRepository implements IGenericRedisService {
  private readonly logger: Logger = new Logger('Redis');
  private tedis: Tedis;

  constructor(redis: Tedis) {
    this.tedis = redis;
  }

  private generateSessionKey(type: string, key: string) {
    return `${type}:${key}`;
  }

  public async getSessionValue(type: string, key: string) {
    const redisKey = this.generateSessionKey(type, key);
    this.logger.log(`Getting session key -> ${redisKey}`);
    return await this.tedis.get(redisKey);
  }

  public async setSessionValue(
    type: string,
    id: string,
    token: string,
    expiredAt: number,
  ) {
    const redisKey = this.generateSessionKey(type, id);
    try {
      await this.tedis.setex(redisKey, expiredAt, token);
      this.logger.log(`New session created -> ${redisKey}`);
    } catch (error) {
      this.logger.error(`Error creating session ${id}`);
      throw error;
    }
  }

  public async deleteSessionValue(id: string) {
    const accessKey = this.generateSessionKey('access', id);
    const refreshKey = this.generateSessionKey('refresh', id);
    await this.tedis.del(accessKey, refreshKey);
  }

  public async existsKey(type: string, key: string) {
    const redisKey = this.generateSessionKey(type, key);
    return await this.tedis.exists(redisKey);
  }
}
