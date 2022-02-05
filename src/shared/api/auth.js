import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '.';
import { setCredentials, setAuthenticated } from '../reducers/user';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken, refreshToken } = await data.tokens;

          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);

          const { id, name, email } = await data.user;

          dispatch(setCredentials({ id, name, email }));
          dispatch(setAuthenticated({ isAuthenticated: true }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    loginByToken: builder.mutation({
      query: () => ({
        url: 'auth/login-by-token',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { id, name, email } = await data;

          dispatch(setCredentials({ id, name, email }));
          dispatch(setAuthenticated({ isAuthenticated: true }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          window.localStorage.setItem('accessToken', null);
          window.localStorage.setItem('refreshToken', null);

          dispatch(setCredentials({ id: null, name: null, email: null }));
          dispatch(setAuthenticated({ isAuthenticated: false }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginByTokenMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
