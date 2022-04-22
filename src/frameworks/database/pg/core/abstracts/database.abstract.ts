import { User } from '../../domain/entities';
import { IUserRepository } from './user-repository.abstract';

export abstract class IDatabaseAbstract {
  public abstract readonly users: IUserRepository<User>;
}