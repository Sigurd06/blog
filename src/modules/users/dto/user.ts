import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResponseFormat } from 'src/lib/dto/responses/response';
import { IUser } from '../interfaces/user';

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
