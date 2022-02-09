import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '.';

export const purchasesApi = createApi({
  reducerPath: 'purchasesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: () => 'purchases',
    }),
    getUserPurchases: builder.query({
      query: (userId) => `purchases/user/${userId}`,
    }),
    createPurchase: builder.mutation({
      query: (purchaseData) => ({
        url: 'purchases',
        method: 'POST',
        body: purchaseData,
      }),
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useGetUserPurchasesQuery,
  useCreatePurchaseMutation,
} = purchasesApi;
