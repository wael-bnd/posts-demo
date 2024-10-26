import {IPost} from '../api';

interface IPostItem extends IPost {
  body: string;
  username: string;
  uniqueKey: string;
}
interface IPostDetailsScreenProps {
  route: {
    params: {
      post: IPostItem;
      user: {
        fullName: string;
        email: string;
        phone: string;
        username: string;
        gender: string;
        dob: string;
        profileImage: string;
      };
    };
  };
}
export type {IPostItem, IPostDetailsScreenProps};
