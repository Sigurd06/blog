import { ICommentResponseRepository } from '../core/abstracts/comment_response-repository.abstract';
import { PgGenericRepository } from './pg-generic.repository';

export class PgCommentResponseRepository<T>
  extends PgGenericRepository<T>
  implements ICommentResponseRepository<T> {}
