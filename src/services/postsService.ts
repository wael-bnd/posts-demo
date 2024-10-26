import axiosInstance from '../api/axiosInstance';
import {store} from '../redux/store/Store';

export const fetchPosts = async (page: number): Promise<any[]> => {
  try {
    const accessToken = store.getState().auth.accessToken;
    const response = await axiosInstance.get('/posts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 30,
        skip: (page - 1) * 30,
      },
    });
    return response.data.posts;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};
