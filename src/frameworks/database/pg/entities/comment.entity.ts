import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { CommentResponse } from './comment_response.entity';
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

  @OneToMany(() => CommentResponse, (response) => response.post_parent, {
    onDelete: 'CASCADE',
  })
  public responses?: CommentResponse[];
}
