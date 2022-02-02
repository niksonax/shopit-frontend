import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '.';
import { setCredentials, setAuthenticated } from '../reducers/user';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
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

          const { name, email } = await data.user;

          dispatch(setCredentials({ name, email }));
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

          dispatch(setCredentials({ name: null, email: null }));
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

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
