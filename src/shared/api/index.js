import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = window.localStorage.getItem('accessToken');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data.error === 'jwt expired'
  ) {
    const refreshResult = await baseQuery(
      'auth/refresh-token',
      api,
      extraOptions
    );

    if (refreshResult.data) {
      window.localStorage.setItem(
        'accessToken',
        refreshResult.data.accessToken
      );
      window.localStorage.setItem(
        'refreshToken',
        refreshResult.data.refreshToken
      );

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      window.localStorage.remove('accessToken');
      window.localStorage.remove('refreshToken');
    }
  }
  return result;
}

export { baseQuery, baseQueryWithReauth };
