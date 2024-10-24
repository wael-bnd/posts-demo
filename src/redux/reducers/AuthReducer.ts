import {createSlice} from '@reduxjs/toolkit';
import {IAuthReducer} from '../../types';

const initiaState: IAuthReducer = {
  accessToken: '',
  refreshToken: '',
  user: null,
};

const AuthReducer = createSlice({
  name: 'auth',
  initialState: initiaState,
  reducers: {
    setAuthData: (state: IAuthReducer, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    resetAuthData: (state: IAuthReducer) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
    },
  },
});

export const {setAuthData, resetAuthData} = AuthReducer.actions;

export default AuthReducer.reducer;
