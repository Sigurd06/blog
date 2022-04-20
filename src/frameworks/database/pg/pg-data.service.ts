import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { IDatabaseAbstract } from 'src/core/abstracts/database/database.abstract';
import { IUserRepository } from 'src/core/abstracts/database/user-repository.abstract';
import { Repository } from 'typeorm';
import { User } from './entities';
import { PgUserRepository } from './repositories/pg-user.repository';

@Injectable()
export class PgDatabaseService
  implements IDatabaseAbstract, OnApplicationBootstrap
{
  public users: IUserRepository<User>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public onApplicationBootstrap() {
    this.users = new PgUserRepository<User>(this.userRepository);
  }
}
