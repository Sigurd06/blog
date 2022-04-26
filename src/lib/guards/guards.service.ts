import { ForbiddenException, Injectable } from '@nestjs/common';
import { IRedisAbstract } from 'src/frameworks/database/redis/core/abstracts/redis.abstracts';

@Injectable()
export class GuardsService {
  constructor(private readonly redisService: IRedisAbstract) {}

  validateAccess = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redisService.redisJWT.getSessionValue(
      'access',
      user,
    );
    if (storedToken !== token)
      throw new ForbiddenException('This access token is not longer valid');
    return true;
  };

  validateRefresh = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redisService.redisJWT.getSessionValue(
      'refresh',
      user,
    );
    if (storedToken !== token)
      throw new ForbiddenException('This refresh token is not longer valid');
    return true;
  };
}
