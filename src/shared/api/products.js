import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '.';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProductsByUser: builder.query({
      query: (userId) => `products/user/${userId}`,
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

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByUserQuery,
  useCreateProductMutation,
} = productsApi;
