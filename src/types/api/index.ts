import {IUser} from '..';

interface IAuthCred {
  username: string;
  password: string;
}
interface IAuthApiResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}
interface IPost {
  id: number;
  title: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  userId: number;
}

interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export type {IAuthApiResponse, IAuthCred, IPost, IPostResponse};
