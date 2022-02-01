import React from 'react';
import { useGetProductsQuery } from '../../shared/api/products';

function Catalog() {
  const { data, error } = useGetProductsQuery();

  return <div>It's a catalog</div>;
}

export default Catalog;
