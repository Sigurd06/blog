import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ResponseFormat } from 'src/lib/dto/responses/response';
import { IUser, IUserUpdate } from '../interfaces/user';

export class UserUpdateDto implements IUserUpdate {
  @ApiProperty({ default: 'new username' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ default: 'new@mail.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'new bio in markdown' })
  @IsOptional()
  @IsString()
  bio: string;
}

export class UserOutput implements IUser {
  @ApiProperty()
  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  image: string;

  @ApiProperty()
  @Expose()
  bio?: string;
}

export class UserOutputDto extends ResponseFormat<any> {
  @ApiProperty()
  data: UserOutput;
}
