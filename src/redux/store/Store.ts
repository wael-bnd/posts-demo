import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from '../reducers/AuthReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const reducers = combineReducers({
  auth: AuthReducer,
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
