import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  name: string;
}
