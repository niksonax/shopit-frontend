import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../shared/reducers/user';
import { useCreatePurchaseMutation } from '../../shared/api/purchases';
import { Paper, Typography, Button } from '@mui/material';
import { LocalMall } from '@mui/icons-material';
import { styled } from '@mui/system';

function ProductCard({ id, name, price, description, handleSnackbarOpen }) {
  const { id: userId } = useSelector(selectCurrentUser);

  const [isHovered, setIsHovered] = useState(false);

  const [createPurchase] = useCreatePurchaseMutation();

  const hoverHandler = () => setIsHovered(true);
  const unHoverHandler = () => setIsHovered(false);

  const createPurchaseHandler = async () => {
    try {
      const { error } = await createPurchase({ productId: id, userId, price });

      if (error) throw new Error(error);

      handleSnackbarOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      elevation={isHovered ? 4 : 1}
      onMouseOver={hoverHandler}
      onMouseOut={unHoverHandler}
    >
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h6" color="primary.main">
        ${price}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
      <Button variant="outlined" onClick={createPurchaseHandler}>
        <LocalMall sx={{ mr: 1 }} />
        Buy
      </Button>
    </Card>
  );
}

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '1.5rem 2rem',
  width: '240px',
  '&>.MuiTypography-root': {
    marginBottom: '1rem',
  },
  '& .MuiButton-root': {
    fontSize: '1rem',
  },
}));

export default ProductCard;
