import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { PaginationDto } from 'src/lib/dto/pagination/pagination';
import { IAccess } from 'src/lib/jwt/interfaces/jwt.interface';
import { AccessGuard } from '../../lib/guards/access.guard';
import { PostDto, PostOupuDto, Posts, PstsOuputDto } from './dto/post';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @Post('create')
  @ApiOkResponse({ type: PostOupuDto })
  @ApiOperation({ summary: 'create post' })
  public async create(
    @Session() payload: IAccess,
    @Body() createPostDto: PostDto,
  ) {
    const post = await this.postsService.create(payload.id, createPostDto);
    return plainToClass(PostDto, post, { excludeExtraneousValues: true });
  }

  @ApiOkResponse({ type: PstsOuputDto })
  @Get('feed')
  @ApiOperation({ summary: 'find all post with pagination' })
  public async findAll(@Query() pagination: PaginationDto) {
    const { results, totalResults, totalPages } =
      await this.postsService.findAll(pagination);

    const postsResponses: Posts[] = [];

    for (const iterator of results) {
      postsResponses.push(
        plainToClass(Posts, iterator, {
          excludeExtraneousValues: true,
        }),
      );
    }

    return {
      results: postsResponses,
      totalPages,
      totalResults,
    };
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {}

  @Patch(':id')
  public async update() {}

  @Delete(':id')
  public async remove(@Param('id') id: string) {}
}
