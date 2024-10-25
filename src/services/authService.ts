import {loginRequest} from '../api/authApi';
import {IAuthCred} from '../types';

export const loginUser = async (credentials: IAuthCred) => {
  try {
    const authData = await loginRequest(credentials);
    return {success: true, authData};
  } catch (error) {
    const errorMessage =
      (error as any).response?.data?.message ||
      'Failed to log in. Please try again.';
    return {success: false, message: errorMessage};
  }
};
