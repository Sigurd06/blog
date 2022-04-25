export interface IUser {
  id?: string;
  username: string;
  email: string;
  image: string;
  bio?: string;
}

export interface IUserUpdate {
  username: string;
  email: string;
  bio?: string;
}
