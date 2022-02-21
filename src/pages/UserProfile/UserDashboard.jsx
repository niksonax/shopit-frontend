import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import {
  TabsListUnstyled,
  TabPanelUnstyled,
  TabsUnstyled,
  TabUnstyled,
  buttonUnstyledClasses,
  tabUnstyledClasses,
} from '@mui/base';
import { CircularProgress } from '@mui/material';
import { Store, ShoppingCart, Settings } from '@mui/icons-material';
import { useLazyGetUserPurchasesQuery } from '../../shared/api/purchases';
import UserPurchases from './UserPurchases';
import { useLazyGetProductsByUserQuery } from '../../shared/api/products';
import UserProducts from './UserProducts';

function UserDashboard({ userId }) {
  const [
    getUserPurchases,
    { data: purchasesData, isSuccess: isPurchasesSuccess },
  ] = useLazyGetUserPurchasesQuery();

  const [
    getProductsByUser,
    { data: productsData, isSuccess: isProductsSuccess },
  ] = useLazyGetProductsByUserQuery();

  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUserPurchases(userId);
    getProductsByUser(userId);
  }, [getUserPurchases, getProductsByUser, userId]);

  useEffect(() => {
    if (isPurchasesSuccess) {
      setPurchases(purchasesData.purchases);
    }
  }, [purchasesData, isPurchasesSuccess]);

  useEffect(() => {
    if (isProductsSuccess) {
      setProducts(productsData.products);
    }
  }, [productsData, isProductsSuccess]);

  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>
          <ShoppingCart />
          Purchases
        </Tab>
        <Tab>
          <Store />
          Products
        </Tab>
        <Tab>
          <Settings />
          Other
        </Tab>
      </TabsList>

      <TabPanel value={0}>
        {!isPurchasesSuccess ? (
          <CircularProgress />
        ) : (
          <UserPurchases purchases={purchases} />
        )}
      </TabPanel>

      <TabPanel value={1}>
        {!isProductsSuccess ? (
          <CircularProgress />
        ) : (
          <UserProducts products={products} userId={userId} />
        )}
      </TabPanel>

      <TabPanel value={2}>Third content</TabPanel>
    </TabsUnstyled>
  );
}

const Tab = styled(TabUnstyled)(
  ({ theme }) => `
    font-family: ${theme.typography.fontFamily};
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: ${theme.shape.borderRadius};
    display: flex;
    justify-content: center;
  
    &:hover {
      background-color: rgba(255, 255, 255, 0.25);
    }
  
    &:focus {
      color: #fff;
      border-radius: 3px;
      outline: 2px solid rgba(255, 255, 255, 0.25);
      outline-offset: 2px;
    }
  
    &.${tabUnstyledClasses.selected} {
      background-color: rgba(255, 255, 255, 0.95);
      color: ${theme.palette.primary.main};
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }

    & .MuiSvgIcon-root {
        margin-right: 0.5rem;
    }
  `
);

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 320px;
    background-color: ${theme.palette.primary.main};
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    z-index: 0;
  `
);

export default UserDashboard;
