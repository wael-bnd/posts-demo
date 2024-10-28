import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PrivateNavigation from './PrivateNavigation/PrivateNavigation';
import PublicNavigation from './PublicNavigation/PublicNavigation';
import {RootState} from '../types';
import {sendLogsToAPI} from '../services/logsService';
import {AppState} from 'react-native';
import {clearLogs, logUserAction} from '../redux/reducers';

const AppNavigation = () => {
  const {accessToken} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const hasAppOpened = useRef(false);
  const logs = useSelector((state: RootState) => state.logger.data);
  const username = useSelector((state: RootState) => state.logger.username);

  useEffect(() => {
    if (!hasAppOpened.current) {
      dispatch(logUserAction('app_open'));
      hasAppOpened.current = true;
    }
  }, []);
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background') {
        dispatch(logUserAction('app_close'));
        sendLogsToAPI(username, logs);
        dispatch(clearLogs());
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [logs, username]);

  return accessToken ? <PrivateNavigation /> : <PublicNavigation />;
};

export default AppNavigation;
