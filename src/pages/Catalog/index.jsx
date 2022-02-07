import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ProductCard from '../../components/ProductCard';
import { Snackbar } from '../../shared/components';
import { useGetProductsQuery } from '../../shared/api/products';

function Catalog() {
  const { data, error, isLoading } = useGetProductsQuery();

  const [products, setProducts] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setIsSnackbarOpen(false);
  const handleSnackbarOpen = () => setIsSnackbarOpen(true);

  const productCards = products.map((item) => (
    <Grid item key={item.id}>
      <ProductCard
        id={item.id}
        name={item.name}
        price={item.price}
        description={item.description}
        handleSnackbarOpen={handleSnackbarOpen}
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
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Purchase was successful!"
      />
    </CatalogContainer>
  );
}

const CatalogContainer = styled(Container)(() => ({
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
}));

export default Catalog;
