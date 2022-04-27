import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('comments_responses')
export class CommentResponse extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public content: string;

  @ManyToOne(() => Comment, (comments) => comments.id, {
    cascade: true,
  })
  public post_parent?: Comment;

  @ManyToOne(() => User, (owner) => owner.id, {
    cascade: true,
  })
  public owner: User;
}
