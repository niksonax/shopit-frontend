import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../shared/hooks';
import { AccountMenu } from '..';
import { ROUTES } from '../../routing/routes';
import { STATES } from '../../pages/Auth/constants';

function Header() {
  const isAuthenticated = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderContainer position="static">
        <Toolbar>
          <Logo>
            <Link to={ROUTES.HOME}>ShopIt</Link>
          </Logo>

          <LinksContainer>
            <NavLink to={ROUTES.HOME}>
              <Typography>Home</Typography>
            </NavLink>
            <NavLink to={ROUTES.CATALOG}>
              <Typography>Catalog</Typography>
            </NavLink>
            <NavLink to={ROUTES.ABOUT}>
              <Typography>About</Typography>
            </NavLink>
          </LinksContainer>

          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <AuthButtons>
              <Link to={ROUTES.AUTH} state={{ page: STATES.LOGIN }}>
                <Button variant="outlined">Login</Button>
              </Link>
              <Link to={ROUTES.AUTH} state={{ page: STATES.SIGN_UP }}>
                <Button variant="contained">Sign Up</Button>
              </Link>
            </AuthButtons>
          )}
        </Toolbar>
      </HeaderContainer>
    </Box>
  );
}

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  borderBottom: '1px solid #ebebeb',
  padding: '0 6rem',
  '& a': {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '30px',
  marginRight: '8rem',
}));

const LinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& .MuiTypography-root': {
    margin: '0 2rem',
    fontWeight: 600,
    fontSize: '18px',
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  '& a': {
    color: theme.palette.common.grey,
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
}));

const AuthButtons = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  '& .MuiButton-root': {
    marginLeft: '1rem',
    borderRadius: '8px',
    fontWeight: 600,
  },
}));

export default Header;
