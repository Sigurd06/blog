import { ApiProperty } from '@nestjs/swagger';
import { IPagination } from 'src/lib/interfaces/pagination/pagination';

export class PaginationDto implements IPagination {
  @ApiProperty({ default: 1 })
  page: number = 1;

  @ApiProperty({ default: 25 })
  quantity: number = 25;
}
