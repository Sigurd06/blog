import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { RefreshGuard } from 'src/lib/guards/refresh.guard';
import { IRefresh } from 'src/lib/jwt/interfaces/jwt.interface';
import { UserOutput, UserOutputDto } from '../users/dto/user';
import { AuthService } from './auth.service';
import {
  AccesOutputDto,
  AuthOutput,
  LogoutOutputDto,
  SignInDto,
  SignUnDto,
} from './dto/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-up')
  @ApiOkResponse({ type: UserOutputDto })
  @ApiOperation({ summary: 'Sing up session' })
  public async singUp(@Body() { email, password, username }: SignUnDto) {
    const user = await this.authService.singUp({
      email,
      password,
      username,
    });

    return plainToClass(UserOutput, user, { excludeExtraneousValues: true });
  }

  @Post('sing-in')
  @ApiOkResponse({ type: AccesOutputDto })
  @ApiOperation({ summary: 'Sing in session' })
  public async singIn(@Body() { email, password }: SignInDto) {
    const access = await this.authService.signIn({
      email,
      password,
    });

    return plainToClass(AuthOutput, access, { excludeExtraneousValues: true });
  }

  @ApiBearerAuth()
  @UseGuards(RefreshGuard)
  @Patch('refresh')
  @ApiOkResponse({ type: AccesOutputDto })
  @ApiOperation({ summary: 'Refresh session' })
  async refreshSession(@Session() session: IRefresh) {
    const access = await this.authService.refresh(session.id);
    return plainToClass(AuthOutput, access, { excludeExtraneousValues: true });
  }

  @ApiBearerAuth()
  @UseGuards(RefreshGuard)
  @Delete('logout')
  @ApiOkResponse({ type: LogoutOutputDto })
  @ApiOperation({ summary: 'Logout session' })
  public async logout(@Session() payload: IRefresh) {
    await this.authService.logout(payload.id);
    return { message: 'Logout Ok' };
  }
}
