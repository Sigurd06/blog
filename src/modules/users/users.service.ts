import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IDatabaseAbstract,
    private exceptions: ExceptionsService,
  ) {}

  async findByEmail(email: string) {
    const user = await this.dataServices.users.findByEmail(email);
    if (!user) {
      this.exceptions.notFoundException({
        message: 'user not found',
      });
    }

    return user;
  }
}
