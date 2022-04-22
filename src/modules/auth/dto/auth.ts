import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResponseFormat } from 'src/lib/dto/responses/response';

export class SignUnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthOutput {
  @ApiProperty()
  @Expose()
  access: string;

  @ApiProperty()
  @Expose()
  refresh: string;
}

export class AccesOutputDto extends ResponseFormat<any> {
  @ApiProperty()
  data: AuthOutput;
}

export class LogoutOutput {
  @ApiProperty()
  message: string;
}

export class LogoutOutputDto extends ResponseFormat<any> {
  @ApiProperty()
  data: LogoutOutput;
}
