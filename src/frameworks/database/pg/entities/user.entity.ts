import { IUser } from 'src/core/models/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base implements IUser {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  name: string;
}
