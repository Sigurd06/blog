import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ResponseFormat } from 'src/lib/dto/responses/response';
import { TagDto } from 'src/modules/tags/dto/tag.dto';
import { UserOutput } from 'src/modules/users/dto/user';
import { IPostCreate } from '../interfaces/post';

export class PostDto implements IPostCreate {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;

  @ApiProperty({
    default: [
      {
        name: 'tag',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @Expose()
  @Type(() => TagDto)
  tags: TagDto[];
}

export class PostOupuDto extends ResponseFormat<any> {
  @ApiProperty()
  data: PostDto;
}

export class Posts extends PostDto {
  @ApiProperty()
  @Expose()
  @Type(() => UserOutput)
  owner: UserOutput;

  @ApiProperty()
  @Expose()
  @Type(() => UserOutput)
  like_owners: UserOutput;
}

export class PstsOuputDto extends ResponseFormat<any> {
  @ApiProperty({ type: [Posts] })
  results: Posts[];

  @ApiProperty()
  totalResults: number;

  @ApiProperty()
  totalPages: number;
}
