import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../shared/reducers/user';
import { useCreatePurchaseMutation } from '../../shared/api/purchases';
import { Box, Paper, Typography, Button } from '@mui/material';
import { LocalMall } from '@mui/icons-material';
import { styled } from '@mui/system';

function ProductCard({
  id,
  name,
  price,
  description: fullDescription,
  handleSnackbarOpen,
}) {
  const { id: userId } = useSelector(selectCurrentUser);

  const [isHovered, setIsHovered] = useState(false);
  const [description, setDescription] = useState(fullDescription);

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

  useEffect(() => {
    if (description.length > 165) {
      setDescription(`${description.slice(0, 164)}...`);
    }
  }, [description]);

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
      <Box>
        <Button variant="outlined" onClick={createPurchaseHandler}>
          <LocalMall sx={{ mr: 1 }} />
          Buy
        </Button>
      </Box>
    </Card>
  );
}

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '1.5rem 2rem',
  width: '240px',
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  '&>.MuiTypography-root': {
    marginBottom: '1rem',
  },
  '& .MuiButton-root': {
    fontSize: '1rem',
  },
  '& .MuiBox-root': {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
  },
}));

export default ProductCard;
