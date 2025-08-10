import { configureStore } from '@reduxjs/toolkit';
import { companyApi } from './services/companyApi';

export const store = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyApi.middleware)
});
