import React, { useState, useEffect } from 'react';
import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import moment from 'moment';
import { useGetProductByIdQuery } from '../../shared/api/products';

function UserPurchases({ purchases }) {
  const [purchasesList, setPurchasesList] = useState();

  useEffect(() => {
    const purchasesSorted = Array.from(purchases).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );

    setPurchasesList(
      purchasesSorted.map((purchase) => (
        <Purchase key={purchase.id} {...purchase} />
      ))
    );
  }, [purchases]);

  return <UserPurchasesContainer>{purchasesList}</UserPurchasesContainer>;
}

const UserPurchasesContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  padding: '0.5rem 1rem',
  zIndex: '100',
}));

function Purchase({ productId, createdAt }) {
  const { data, isLoading } = useGetProductByIdQuery(productId);

  const date = moment(createdAt).locale('en').format('LLL');

  return isLoading ? (
    <Skeleton height={80} />
  ) : (
    <PurchaseContainer>
      <Box>
        <Typography variant="h6">{data.name}</Typography>
        <Typography variant="h6">${data.price}</Typography>
      </Box>
      <Typography color="GrayText">{date}</Typography>
    </PurchaseContainer>
  );
}

const PurchaseContainer = styled(Paper)(({ theme }) => ({
  margin: '1.5rem 0',
  padding: '1rem 1.5rem',
  background: theme.palette.common.white,
  '& .MuiBox-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default UserPurchases;
