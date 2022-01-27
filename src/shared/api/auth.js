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
          dispatch(setAuthenticated(true));
        } catch (error) {}
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'users/',
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
          dispatch(setAuthenticated(true));
        } catch (error) {}
      },
    }),
    /* login: builder.query({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.query({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: credentials,
      }),
    }), */
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
