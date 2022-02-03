import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '.';

export const purchasesApi = createApi({
  reducerPath: 'purchasesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPurchases: builder.query({
      query: () => 'purchases',
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

export const { useGetPurchasesQuery, useCreatePurchaseMutation } = purchasesApi;
