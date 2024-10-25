import {IUser} from '..';

interface IAuthCred {
  username: string;
  password: string;
}
interface IAuthApiResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}
export type {IAuthApiResponse, IAuthCred};
