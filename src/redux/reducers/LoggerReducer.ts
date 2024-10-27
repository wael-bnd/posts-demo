import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LogEntry, LoggerState} from '../../types';

const initialState: LoggerState = {
  data: [],
  username: null,
};

const LoggerReducer = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logUserAction: (state, action: PayloadAction<string>) => {
      const logEntry: LogEntry = {
        action: action.payload,
        ts: new Date().toISOString(),
      };
      state.data.push(logEntry);
    },
    clearLogs: state => {
      state.data = [];
    },
  },
});

export const {setUsername, logUserAction, clearLogs} = LoggerReducer.actions;

export default LoggerReducer.reducer;
