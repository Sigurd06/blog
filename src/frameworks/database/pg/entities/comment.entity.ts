import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, (owner) => owner.id, {
    onDelete: 'CASCADE',
  })
  public owner: User;
}
