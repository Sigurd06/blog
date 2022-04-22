import { ApiProperty } from '@nestjs/swagger';

export class ResponseFormat<T> {
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;
  @ApiProperty()
  code: number;

  data: T;
}

export class ResponseBadRequestFormat {
  @ApiProperty()
  code: number;
  @ApiProperty()
  timestamp: Date;
  @ApiProperty()
  path: string;
  @ApiProperty()
  message: string;
}

export class ResponseForUpdateOrDelete extends ResponseFormat<any> {
  @ApiProperty()
  data: string;
}
