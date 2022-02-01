import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '.';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
