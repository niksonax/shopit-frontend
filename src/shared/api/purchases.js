import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '.';

export const purchasesApi = createApi({
  reducerPath: 'purchasesApi',
  baseQuery,
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
