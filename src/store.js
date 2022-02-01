import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './shared/api/auth';
import { productsApi } from './shared/api/products';
import { userReducer } from './shared/reducers';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});

setupListeners(store.dispatch);
