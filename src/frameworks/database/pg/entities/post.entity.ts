import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity('posts')
export class Post extends Base {
  @PrimaryGeneratedColumn('uuid')
  public readonly id?: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, (owner) => owner.posts, {
    onDelete: 'CASCADE',
  })
  public owner: User;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: {
      name: 'post',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag',
      referencedColumnName: 'id',
    },
  })
  public tags?: Tag[];

  @ManyToMany(() => User, (user) => user.likes_posts, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'posts_likes',
    joinColumn: {
      name: 'post',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'owner',
      referencedColumnName: 'id',
    },
  })
  public like_owners?: User[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments?: Comment[];
}
