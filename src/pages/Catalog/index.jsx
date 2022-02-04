import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ProductCard from '../../components/ProductCard';
import { useGetProductsQuery } from '../../shared/api/products';

function Catalog() {
  const { data, error, isLoading } = useGetProductsQuery();
  const [products, setProducts] = useState([]);

  const productCards = products.map((item) => (
    <Grid item key={item.id}>
      <ProductCard
        name={item.name}
        price={item.price}
        description={item.description}
      />
    </Grid>
  ));

  useEffect(() => {
    if (!isLoading) {
      setProducts(data.products);
    }
  }, [data, isLoading]);

  return (
    <CatalogContainer>
      <Grid container justifyContent="space-evenly" rowSpacing={5}>
        {productCards}
      </Grid>
    </CatalogContainer>
  );
}

const CatalogContainer = styled(Container)(() => ({
  marginTop: '1rem',
}));

export default Catalog;
