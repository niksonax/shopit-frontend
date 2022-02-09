import React, { useState, useEffect } from 'react';
import { Box, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Edit, Delete, AddBusiness } from '@mui/icons-material';
import { useDeleteProductMutation } from '../../shared/api/products';
import { ProductModal } from '../../components';
import { MODAL_STATES } from '../../components/ProductModal/constants';

function UserProducts({ products, userId }) {
  const [productsList, setProductsList] = useState();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleProductCreate = () => setCreateModalOpen(true);
  const handleProductCreateClose = () => setCreateModalOpen(false);

  useEffect(() => {
    setProductsList(
      products.map((product) => <Product key={product.id} {...product} />)
    );
  }, [products]);

  return (
    <UserProductsContainer>
      <CreateProductButton component="button" onClick={handleProductCreate}>
        <AddBusiness fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h5">Create new product</Typography>
      </CreateProductButton>
      {productsList}

      <ProductModal
        state={MODAL_STATES.CREATE}
        open={createModalOpen}
        handleClose={handleProductCreateClose}
        userId={userId}
      />
    </UserProductsContainer>
  );
}

const UserProductsContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: '1rem',
}));

const CreateProductButton = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '1rem',
  marginBottom: '2rem',
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.grey[100],
  },
}));

function Product({ id, name, price, description }) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [deleteProduct] = useDeleteProductMutation();

  const handleProductEdit = () => setEditModalOpen(true);
  const handleProductEditClose = () => setEditModalOpen(false);

  const handleProductDelete = () => deleteProduct(id);

  return !name ? (
    <Skeleton variant="rectangular" height={250} sx={{ mb: 2 }} />
  ) : (
    <ProductContainer>
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Box>
          <IconButton onClick={handleProductEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleProductDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="h6">${price}</Typography>
      <Typography color="text.secondary">{description}</Typography>

      <ProductModal
        state={MODAL_STATES.EDIT}
        open={editModalOpen}
        handleClose={handleProductEditClose}
        product={{ id, name, price, description }}
      />
    </ProductContainer>
  );
}

const ProductContainer = styled(Paper)(({ theme }) => ({
  margin: '0 0 2rem',
  padding: '1rem 1.5rem',
  background: theme.palette.common.white,
  '& .MuiBox-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default UserProducts;
