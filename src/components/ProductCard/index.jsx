import React, { useState } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { LocalMall } from '@mui/icons-material';
import { styled } from '@mui/system';

function ProductCard({ name, price, description }) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverHandler = (e) => setIsHovered(true);
  const unHoverHandler = () => setIsHovered(false);

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
      <Button variant="outlined">
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
