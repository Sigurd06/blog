import { IGenericRepository } from './generic-repository.abstract';

export abstract class IPostRepository<T> extends IGenericRepository<T> {
  public abstract paginate(
    page: number,
    quantity: number,
  ): Promise<[T[], number]>;
}
