import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Comment } from './comment.entity';
import { CommentResponse } from './comment_response.entity';
import { Post } from './post.entity';

@Entity('users')
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  public readonly id?: string;

  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public bio?: string;

  @Column({ nullable: true })
  public image?: string;

  @Column()
  public password?: string;

  @OneToMany(() => Post, (post) => post.owner, {
    cascade: true,
  })
  public posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.owner, {
    cascade: true,
  })
  public comment?: Comment[];

  @OneToMany(() => CommentResponse, (response) => response.owner, {
    onDelete: 'CASCADE',
  })
  public responses?: CommentResponse[];

  @ManyToMany(() => Post, (post) => post.id, {
    cascade: true,
  })
  public likes_posts?: Post[];
}
