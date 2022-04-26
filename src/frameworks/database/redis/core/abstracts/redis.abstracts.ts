import { IGenericRedisService } from './generic-redis.abstract';

export abstract class IRedisAbstract {
  public abstract readonly redisJWT: IGenericRedisService;
}
