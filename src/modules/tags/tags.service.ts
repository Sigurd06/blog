import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  create(createTagDto: TagDto) {}

  findAll() {}

  findOne(id: number) {}

  update() {}

  remove(id: number) {}
}
