import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { RedisService } from '../redis/redis.service';
import { IAccess, IRefresh } from './interfaces/jwt.interface';

@Injectable()
export class JWTService {
  constructor(
    private readonly redis: RedisService,
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

  public async createAccess(payload: IAccess) {
    const access: any = this.config.get<string>('JWT_ACCESS_KEY');
    const token = sign(payload, access, { expiresIn: '8h' });
    await this.redis.setSessionValue('access', payload.id, token, 3600 * 8);
    return token;
  }

  public async createRefresh(payload: IRefresh) {
    const access: any = this.config.get<string>('JWT_REFRESH_KEY');
    const token = sign(payload, access, { expiresIn: '14d' });
    await this.redis.setSessionValue(
      'refresh',
      payload.id,
      token,
      3600 * 24 * 14,
    );
    return token;
  }
}
