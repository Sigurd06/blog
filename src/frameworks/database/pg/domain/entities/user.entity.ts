import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  public readonly id?: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  password: string;
}
