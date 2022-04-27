import { IPost } from 'src/modules/posts/interfaces/post';

export interface ITag {
  id?: string;
  name: string;
  posts?: IPost[];
}
