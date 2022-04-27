import { ITag } from 'src/modules/tags/interfaces/tag';
import { IUser } from 'src/modules/users/interfaces/user';

export class IPostCreate {
  title: string;
  content: string;
  tags?: ITag[];
}

export interface IPost extends IPostCreate {
  id?: string;
  owner: IUser;
  like_owners?: IUser[];
}
