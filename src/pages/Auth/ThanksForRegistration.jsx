import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Container, SvgIcon, Typography, Button } from '@mui/material';
import { ReactComponent as CompleteIconSvg } from '../../shared/svg/complete.svg';
import { ROUTES } from '../../routing/routes';

function ThanksForRegistration() {
  const navigate = useNavigate();

  const handleContinue = () => navigate(ROUTES.HOME);

  return (
    <ThankYouContainer>
      <SvgIcon component={CompleteIconSvg} inheritViewBox />

      <Typography variant="h6" fontWeight={700}>
        Thank you for registering
      </Typography>
      <Typography>Now you can login using your credentials</Typography>

      <Button variant="contained" onClick={handleContinue}>
        Continue
      </Button>
    </ThankYouContainer>
  );
}

const ThankYouContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem 0',
  '& .MuiSvgIcon-root': {
    width: '96px',
    height: '96px',
    marginBottom: '1.5rem',
  },
  '& .MuiButton-root': {
    marginTop: '1.5rem',
    padding: '0.5rem 3rem',
  },
}));

export { ThanksForRegistration };
