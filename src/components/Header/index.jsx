import './styles.scss';
import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routing/routes';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography className="logo">ShopIt</Typography>
          <Box className="nav-links">
            <Link to={ROUTES.HOME}>
              <Typography>Home</Typography>
            </Link>
            <Typography>Catalog</Typography>
            <Typography>About</Typography>
          </Box>
          <Box className="auth-buttons">
            <Link to={ROUTES.AUTH} state={{ page: 'login' }}>
              <Button variant="outlined">Login</Button>
            </Link>
            <Link to={ROUTES.AUTH} state={{ page: 'sign-up' }}>
              <Button variant="contained">Sign Up</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
