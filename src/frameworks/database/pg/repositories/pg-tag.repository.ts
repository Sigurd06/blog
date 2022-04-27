import { ITagRepository } from '../core/abstracts/tag-repository.abstract';
import { PgGenericRepository } from './pg-generic.repository';

export class PgTagRepository<T>
  extends PgGenericRepository<T>
  implements ITagRepository<T>
{
  public async findByName(name: string): Promise<T> {
    return this._repository.findOne({ where: { name } });
  }
}
