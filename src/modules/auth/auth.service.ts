import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';
import { JWTService } from 'src/lib/jwt/jwt.service';
import { IRedisAbstract } from '../../frameworks/database/redis/core/abstracts/redis.abstracts';
import { Generate } from '../users/functions/avatar/generate';
import { HashPassword } from '../users/functions/hashed/password';
import { ISingInData, ISingUpDate } from './interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataServices: IDatabaseAbstract,
    private readonly redisService: IRedisAbstract,
    private readonly exceptions: ExceptionsService,
    private readonly jwtService: JWTService,
  ) {}

  private async validateEmail(email: string) {
    return await this.dataServices.users.findByEmail(email);
  }

  public async signIn({ email, password }: ISingInData) {
    const user = await this.validateEmail(email);
    if (user && HashPassword.verifyPassword(password, user.password)) {
      return {
        access: await this.jwtService.createAccess({ id: user.id }),
        refresh: await this.jwtService.createRefresh({ id: user.id }),
      };
    }
    this.exceptions.UnauthorizedException({
      message: 'Invalid credential',
    });
  }

  public async singUp({ email, password, username }: ISingUpDate) {
    const user = await this.validateEmail(email);
    if (user) {
      this.exceptions.badRequestException({
        message: 'Resource already exists',
      });
    }
    return await this.dataServices.users.create({
      email,
      username,
      image: Generate.avatar(email),
      password: HashPassword.encryptPassword(password),
    });
  }

  public async refresh(id: string) {
    await this.redisService.redisJWT.deleteSessionValue(id);
    return {
      access: await this.jwtService.createAccess({ id }),
      refresh: await this.jwtService.createRefresh({ id }),
    };
  }

  public async logout(id: string) {
    await this.redisService.redisJWT.deleteSessionValue(id);
  }
}
