import { IPostRepository } from '../core/abstracts/post-repository.abstract';
import { PgGenericRepository } from './pg-generic.repository';

export class PgPostRepository<T>
  extends PgGenericRepository<T>
  implements IPostRepository<T> {}
