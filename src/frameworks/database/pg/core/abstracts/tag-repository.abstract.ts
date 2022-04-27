import { IGenericRepository } from './generic-repository.abstract';

export abstract class ITagRepository<T> extends IGenericRepository<T> {
  public abstract findByName(name: string): Promise<T>;
}
