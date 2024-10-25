import axios from 'axios';
import {IAuthCred} from '../types';

const LOGIN_URL = 'https://dummyjson.com/auth/login';

export const loginRequest = async (credentials: IAuthCred) => {
  const response = await axios.post(LOGIN_URL, credentials);
  return response.data;
};
