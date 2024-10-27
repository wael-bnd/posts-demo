import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from '../reducers/AuthReducer';
import LoggerReducer from '../reducers/LoggerReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: ['logger'],
};

const reducers = combineReducers({
  auth: AuthReducer,
  logger: LoggerReducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
const persistor = persistStore(store);
export {store, persistor};
