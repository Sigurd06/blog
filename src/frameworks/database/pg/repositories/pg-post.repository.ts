import { IPostRepository } from '../core/abstracts/post-repository.abstract';
import { PgGenericRepository } from './pg-generic.repository';

export class PgPostRepository<T>
  extends PgGenericRepository<T>
  implements IPostRepository<T>
{
  public paginate(page: number, quantity: number): Promise<[T[], number]> {
    return this._repository
      .createQueryBuilder('posts')
      .select([
        'posts.id',
        'posts.title',
        'posts.content',
        'posts.createdAt',
        'owner.username',
        'owner.image',
        'owner.bio',
        'tags.id',
        'tags.name',
        'likes.id',
        'likes.username',
        'likes.image',
        'comments.id',
        'comments.content',
        'comments.createdAt',
        'comment_owner.username',
        'comment_owner.image',
      ])
      .leftJoin('posts.owner', 'owner')
      .leftJoin('posts.tags', 'tags')
      .leftJoin('posts.like_owners', 'likes')
      .leftJoin('posts.comments', 'comments')
      .leftJoin('comments.owner', 'comment_owner')
      .limit(quantity)
      .offset(quantity * (page - 1))
      .orderBy('posts.createdAt', 'DESC')
      .getManyAndCount();
  }
}
