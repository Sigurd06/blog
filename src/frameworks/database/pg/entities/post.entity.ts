import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity('posts')
export class Post extends Base {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

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
      name: 'tag',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post',
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
      name: 'owner',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'post',
      referencedColumnName: 'id',
    },
  })
  public like_owners?: User;
}
