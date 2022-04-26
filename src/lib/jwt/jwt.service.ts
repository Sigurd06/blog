import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IRedisAbstract } from 'src/frameworks/database/redis/core/abstracts/redis.abstracts';

import { IAccess, IRefresh } from './interfaces/jwt.interface';

@Injectable()
export class JWTService {
  constructor(
    private readonly redisSerivce: IRedisAbstract,
    private readonly config: ConfigService,
    private readonly exceptions: ExceptionsService,
  ) {}

  private decodeToken = (token: string) => {
    return decode(token);
  };

  public async verifyAccess(token: string) {
    const access: any = this.config.get<string>('JWT_ACCESS_KEY');
    try {
      return verify(token, access);
    } catch (error) {
      this.exceptions.forbiddenException({
        message: 'Invalid access token',
      });
    }
  }

  public async verifyRefresh(token: string) {
    const refresh: any = this.config.get<string>('JWT_REFRESH_KEY');
    try {
      return verify(token, refresh);
    } catch (error) {
      this.exceptions.forbiddenException({
        message: 'Invalid refresh token',
      });
    }
  }

  public async createAccess(payload: IAccess): Promise<string> {
    const access: any = this.config.get<string>('JWT_ACCESS_KEY');
    const token = sign(payload, access, { expiresIn: '8h' });
    await this.redisSerivce.redisJWT.setSessionValue(
      'access',
      payload.id,
      token,
      3600 * 8,
    );
    return token;
  }

  public async createRefresh(payload: IRefresh): Promise<string> {
    const access: any = this.config.get<string>('JWT_REFRESH_KEY');
    const token = sign(payload, access, { expiresIn: '14d' });
    await this.redisSerivce.redisJWT.setSessionValue(
      'refresh',
      payload.id,
      token,
      3600 * 24 * 14,
    );
    return token;
  }
}
