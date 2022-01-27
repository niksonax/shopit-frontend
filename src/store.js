import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './shared/api/auth';
import { userReducer } from './shared/reducers';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
