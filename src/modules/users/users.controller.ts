import {
  Body,
  Controller,
  Get,
  Param,
  Put,
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
import { ResponseForUpdateOrDelete } from 'src/lib/dto/responses/response';
import { AccessGuard } from 'src/lib/guards/access.guard';
import { IAccess } from 'src/lib/jwt/interfaces/jwt.interface';
import { UserOutput, UserOutputDto, UserUpdateDto } from './dto/user';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({ type: UserOutputDto })
  @Get('profile/:username')
  @ApiOperation({ summary: 'Get Profile by username' })
  public async findProfileByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return plainToClass(UserOutput, user, { excludeExtraneousValues: true });
  }

  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @ApiOkResponse({ type: UserOutputDto })
  @Get('profile')
  @ApiOperation({ summary: 'Get me profile' })
  async findMe(@Session() payload: IAccess) {
    const user = await this.userService.findMeProfile(payload.id);
    return plainToClass(UserOutput, user, { excludeExtraneousValues: true });
  }

  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @Put('profile')
  @ApiOkResponse({ type: ResponseForUpdateOrDelete })
  @ApiOperation({ summary: 'Update profile info' })
  public async updateProfile(
    @Session() payload: IAccess,
    @Body() data: UserUpdateDto,
  ) {
    await this.userService.updateProfile(payload.id, data);
    return 'profile updated';
  }
}
