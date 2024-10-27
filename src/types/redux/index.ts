import {store} from '../../redux/store/Store';

interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
interface IAuthReducer {
  accessToken: string;
  refreshToken: string;
  user: IUser | null;
}
interface LogEntry {
  action: string;
  ts: string;
}

interface LoggerState {
  data: LogEntry[];
  username: string | null;
}
export type {IAuthReducer, IUser, LoggerState, LogEntry};
export type RootState = ReturnType<typeof store.getState>;
