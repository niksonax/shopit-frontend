import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { ROUTES } from '../../routing/routes';
import { STATES } from '../../pages/Auth/constants';

function Home() {
  return (
    <HomeContainer>
      <Typography variant="h2" fontWeight={600}>
        Easy {'&'} Powerful
      </Typography>
      <Typography variant="h2" fontWeight={600}>
        Marketplace
      </Typography>
      <Typography variant="h4" mt={2}>
        Buy or sell new and used items easily at ShopIt
      </Typography>
      <ButtonBox>
        <Link to={ROUTES.AUTH} state={{ page: STATES.SIGN_UP }}>
          <Button variant="contained">Sign Up</Button>
        </Link>

        <Link to={ROUTES.ABOUT}>
          <Button variant="outlined">Learn More</Button>
        </Link>
      </ButtonBox>
    </HomeContainer>
  );
}

const HomeContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '0 8rem',
  height: '92vh',
  '& a': {
    textDecoration: 'none',
  },
}));

const ButtonBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '2rem 0',
  '& .MuiButton-root': {
    marginRight: '2rem',
    fontSize: '22px',
  },
}));

export default Home;
