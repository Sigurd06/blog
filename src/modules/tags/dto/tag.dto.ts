import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IPost } from 'src/modules/posts/interfaces/post';
import { ITag } from '../interfaces/tag';

export class TagDto implements ITag {
  @ApiProperty()
  @Expose()
  id?: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  posts?: IPost[];
}
