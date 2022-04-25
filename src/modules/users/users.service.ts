import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';
import { IUserUpdate } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IDatabaseAbstract,
    private exceptions: ExceptionsService,
  ) {}

  public async updateProfile(id: string, data: IUserUpdate) {
    const user = await this.dataServices.users.findOne(id);
    if (!user) {
      this.exceptions.notFoundException({ message: 'User not found' });
    }

    const userExist = await Promise.all([
      this.dataServices.users.findByEmail(data.email),
      this.dataServices.users.findByUsername(data.username),
    ]);

    if (userExist.length) {
      this.exceptions.badRequestException({
        message: 'Resource already exists',
      });
    }

    await this.dataServices.users.update(user.id, data);
  }

  public async findByUsername(username: string) {
    const user = await this.dataServices.users.findByUsername(username);
    if (!user) {
      this.exceptions.notFoundException({ message: 'User not found' });
    }
    return user;
  }
}
