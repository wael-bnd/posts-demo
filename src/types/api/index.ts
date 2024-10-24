import {IUser} from '..';

interface IAuthApiResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}
export type {IAuthApiResponse};
