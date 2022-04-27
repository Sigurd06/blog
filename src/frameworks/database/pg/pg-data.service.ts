import { OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { IDatabaseAbstract } from 'src/frameworks/database/pg/core/abstracts/database.abstract';
import { Repository } from 'typeorm';
import { ICommentRepository } from './core/abstracts/comment-repository.abstract';
import { ICommentResponseRepository } from './core/abstracts/comment_response-repository.abstract';
import { IPostRepository } from './core/abstracts/post-repository.abstract';
import { ITagRepository } from './core/abstracts/tag-repository.abstract';
import { IUserRepository } from './core/abstracts/user-repository.abstract';
import { Comment, CommentResponse, Post, Tag, User } from './entities';
import { PgCommentResponseRepository } from './repositories/pg-comment-response.repository';
import { PgCommentRepository } from './repositories/pg-comment.repository';
import { PgPostRepository } from './repositories/pg-post.repository';
import { PgTagRepository } from './repositories/pg-tag.repository';
import { PgUserRepository } from './repositories/pg-user.repository';

@Injectable()
export class PgDatabaseService
  implements IDatabaseAbstract, OnApplicationBootstrap
{
  public users: IUserRepository<User>;
  public posts: IPostRepository<Post>;
  public comments: ICommentRepository<Comment>;
  public commentsResponses: ICommentResponseRepository<CommentResponse>;
  public tags: ITagRepository<Tag>;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(CommentResponse)
    private readonly commentResponseRepository: Repository<CommentResponse>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public onApplicationBootstrap() {
    this.users = new PgUserRepository<User>(this.userRepository);
    this.posts = new PgPostRepository<Post>(this.postRepository);
    this.comments = new PgCommentRepository<Comment>(this.commentRepository);
    this.commentsResponses = new PgCommentResponseRepository<CommentResponse>(
      this.commentResponseRepository,
    );
    this.tags = new PgTagRepository<Tag>(this.tagRepository);
  }
}
