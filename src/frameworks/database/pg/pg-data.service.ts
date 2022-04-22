import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';
import { Repository } from 'typeorm';
import { IUserRepository } from './core/abstracts/user-repository.abstract';
import { User } from './domain/entities';
import { PgUserRepository } from './domain/repositories/pg-user.repository';

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
