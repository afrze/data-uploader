import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/jobsSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    jobStore: jobsReducer,
    authStore: authReducer,
  },
});
