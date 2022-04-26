import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Post } from './post.entity';

@Entity('tags')
export class Tag extends Base {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  public posts?: Post[];
}
