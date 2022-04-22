import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { IAccess } from '../jwt/interfaces/jwt.interface';
import { GuardsService } from './guards.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly guardService: GuardsService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) throw new UnauthorizedException('Null Access Token'); //Null token

    try {
      const user = verify(
        token,
        `${this.config.get<string>('JWT_ACCESS_KEY')}`,
      ) as IAccess;
      req.session = user; //User Session
      await this.guardService.validateAccess(token, user.id);
    } catch (error) {
      throw new ForbiddenException('Invalid Access Token');
    }
    return true;
  }
}
