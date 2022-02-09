import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  InputLabel,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import { FIELDS, MODAL_STATES } from './constants';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../shared/api/products';

function ProductModal({ state, open, handleClose, userId, product }) {
  const [productData, setProductData] = useState({
    [FIELDS.NAME]: '',
    [FIELDS.PRICE]: '',
    [FIELDS.DESCRIPTION]: '',
  });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleInputChange = (e) => {
    const field = e.target.id;
    const data = e.target.value;
    setProductData({ ...productData, [field]: data });
  };

  const handleSubmit = async () => {
    if (state === MODAL_STATES.CREATE) {
      await createProduct({
        name: productData[FIELDS.NAME],
        price: productData[FIELDS.PRICE],
        description: productData[FIELDS.DESCRIPTION],
        userId,
      });
    } else if (state === MODAL_STATES.EDIT) {
      console.log(product.id, {
        name: productData[FIELDS.NAME],
        price: productData[FIELDS.PRICE],
        description: productData[FIELDS.DESCRIPTION],
      });
      await updateProduct({
        id: product.id,
        name: productData[FIELDS.NAME],
        price: productData[FIELDS.PRICE],
        description: productData[FIELDS.DESCRIPTION],
      });
    }

    handleClose();
  };

  useEffect(() => {
    if (state === MODAL_STATES.EDIT) {
      setProductData({
        [FIELDS.NAME]: product.name,
        [FIELDS.PRICE]: product.price,
        [FIELDS.DESCRIPTION]: product.description,
      });
    }
  }, [product, state]);

  return (
    <ProductDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {state === MODAL_STATES.CREATE ? 'Create Product' : 'Edit Product'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {state === MODAL_STATES.CREATE
            ? 'Please, provide us with info about your product'
            : 'Here you can change your product details'}
        </DialogContentText>

        <ProductForm>
          <InputLabel>Name</InputLabel>
          <TextField
            id={FIELDS.NAME}
            type="text"
            value={productData[FIELDS.NAME]}
            onChange={handleInputChange}
          />

          <InputLabel>Price</InputLabel>
          <TextField
            id={FIELDS.PRICE}
            type="number"
            value={productData[FIELDS.PRICE]}
            onChange={handleInputChange}
          />

          <InputLabel>Description</InputLabel>
          <TextField
            id={FIELDS.DESCRIPTION}
            multiline
            rows={4}
            value={productData[FIELDS.DESCRIPTION]}
            onChange={handleInputChange}
          />
        </ProductForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {state === MODAL_STATES.CREATE ? 'Create Product' : 'Save Changes'}
        </Button>
      </DialogActions>
    </ProductDialog>
  );
}

const ProductDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: '1rem 2rem',
    width: '450px',
  },
  '& .MuiDialogContentText-root': {
    marginBottom: '1.5rem',
  },
}));

const ProductForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& .MuiTextField-root': {
    marginTop: '0.25rem',
    marginBottom: '1.5rem',
    // height: '40px',
  },
}));

export default ProductModal;
