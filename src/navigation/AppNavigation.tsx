import React from 'react';
import {useSelector} from 'react-redux';
import PrivateNavigation from './PrivateNavigation/PrivateNavigation';
import PublicNavigation from './PublicNavigation/PublicNavigation';
import {RootState} from '../types';

const AppNavigation = () => {
  const {accessToken} = useSelector((state: RootState) => state.auth);
  return accessToken ? <PrivateNavigation /> : <PublicNavigation />;
};

export default AppNavigation;
