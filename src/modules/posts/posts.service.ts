import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';
import { Pagination } from 'src/lib/functions/pagination/pagination';
import { IPagination } from 'src/lib/interfaces/pagination/pagination';
import { IPostCreate } from './interfaces/post';

@Injectable()
export class PostsService {
  constructor(
    private readonly dataService: IDatabaseAbstract,
    private readonly exceptions: ExceptionsService,
  ) {}

  public async create(owner: string, data: IPostCreate) {
    const user = await this.dataService.users.findOne(owner);

    let tagsToSave: any[] = [];
    for (const tag of data.tags) {
      const dbTag = await this.dataService.tags.findByName(tag.name);
      if (!dbTag) {
        tagsToSave.push(await this.dataService.tags.create(tag));
      } else {
        tagsToSave.push(dbTag);
      }
    }
    return await this.dataService.posts.create({
      title: data.title,
      content: data.content,
      tags: tagsToSave.flat(Infinity),
      owner: user,
    });
  }

  public async findAll({ page, quantity }: IPagination) {
    const posts = await this.dataService.posts.paginate(page, quantity);
    if (!posts[0].length) {
      this.exceptions.notFoundException({ message: 'No posts found' });
    }
    return {
      results: posts[0],
      totalResults: posts[1],
      totalPages: Pagination.getTotalPagesForPagination(posts[1], quantity),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
