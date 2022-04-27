import { ICommentRepository } from '../core/abstracts/comment-repository.abstract';
import { PgGenericRepository } from './pg-generic.repository';

export class PgCommentRepository<T>
  extends PgGenericRepository<T>
  implements ICommentRepository<T> {}
