import { IUser } from 'src/core/models/user.model';
import { IUserRepository } from './user-repository.abstract';

export abstract class IDatabaseAbstract {
  public abstract readonly users: IUserRepository<IUser>;
}
