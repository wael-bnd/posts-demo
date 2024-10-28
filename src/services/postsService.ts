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
        limit: 10,
        skip: (page - 1) * 10,
      },
    });
    return response.data.posts;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};
