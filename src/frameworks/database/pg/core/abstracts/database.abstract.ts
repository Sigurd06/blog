import { Comment, CommentResponse, Post, Tag, User } from '../../entities';
import { ICommentRepository } from './comment-repository.abstract';
import { ICommentResponseRepository } from './comment_response-repository.abstract';
import { IPostRepository } from './post-repository.abstract';
import { ITagRepository } from './tag-repository.abstract';
import { IUserRepository } from './user-repository.abstract';

export abstract class IDatabaseAbstract {
  public abstract readonly users: IUserRepository<User>;
  public abstract readonly posts: IPostRepository<Post>;
  public abstract readonly comments: ICommentRepository<Comment>;
  public abstract readonly commentsResponses: ICommentResponseRepository<CommentResponse>;
  public abstract readonly tags: ITagRepository<Tag>;
}
