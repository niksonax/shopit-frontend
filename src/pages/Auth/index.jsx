import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import {
  Container,
  Box,
  Tab,
  Button,
  Typography,
  Checkbox,
  InputLabel,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Input } from '../../shared/components';
import { STATES, FIELDS } from './constants';

function Auth() {
  const location = useLocation();

  const [pageState, setPageState] = useState(STATES.LOGIN);
  const [userData, setUserData] = useState({
    [FIELDS.NAME]: '',
    [FIELDS.EMAIL]: '',
    [FIELDS.PASSWORD]: '',
    [FIELDS.PASSWORD_CONFIRM]: '',
    [FIELDS.AGREEMENT]: false,
  });

  const handleTabChange = (e, newState) => setPageState(newState);

  const handleInputChange = (e) => {
    const field = e.target.id;
    const data = e.target.value;
    setUserData({ ...userData, [field]: data });
  };
  const handleCheckboxChange = (e) => {
    const field = e.target.id;
    const checked = e.target.checked;
    setUserData({ ...userData, [field]: checked });
  };

  const handleLoginSubmit = () => {
    console.log(userData);
  };
  const handleSignUpSubmit = () => {
    console.log(userData);
  };

  useEffect(() => {
    if (location.state) {
      setPageState(location.state.page);
    }
  }, [location]);

  return (
    <AuthContainer>
      <TabContext value={pageState}>
        <TabList onChange={handleTabChange} centered>
          <Tab label="Login" value={STATES.LOGIN} />
          <Tab label="Sign Up" value={STATES.SIGN_UP} />
        </TabList>

        <TabPanel value={STATES.LOGIN}>
          <AuthForm>
            <InputLabel>Email</InputLabel>
            <Input
              id={FIELDS.EMAIL}
              placeholder="example@mail.com"
              value={userData[FIELDS.EMAIL]}
              onChange={handleInputChange}
            />

            <InputLabel>Password</InputLabel>
            <Input
              id={FIELDS.PASSWORD}
              type="password"
              value={userData[FIELDS.PASSWORD]}
              onChange={handleInputChange}
            />

            <Button variant="contained" onClick={handleLoginSubmit}>
              Login
            </Button>
          </AuthForm>
        </TabPanel>

        <TabPanel value={STATES.SIGN_UP}>
          <AuthForm>
            <InputLabel>Name</InputLabel>
            <Input
              id={FIELDS.NAME}
              placeholder="Your Name"
              value={userData[FIELDS.NAME]}
              onChange={handleInputChange}
            />

            <InputLabel>Email</InputLabel>
            <Input
              id={FIELDS.EMAIL}
              placeholder="example@mail.com"
              value={userData[FIELDS.EMAIL]}
              onChange={handleInputChange}
            />

            <InputLabel>Password</InputLabel>
            <Input
              id={FIELDS.PASSWORD}
              type="password"
              value={userData[FIELDS.PASSWORD]}
              onChange={handleInputChange}
            />

            <InputLabel>Confirm password</InputLabel>
            <Input
              id={FIELDS.PASSWORD_CONFIRM}
              type="password"
              value={userData[FIELDS.PASSWORD_CONFIRM]}
              onChange={handleInputChange}
            />

            <AgreementContainer>
              <Checkbox
                id={FIELDS.AGREEMENT}
                checked={userData[FIELDS.AGREEMENT]}
                onChange={handleCheckboxChange}
              />
              <Typography>
                By creating an account you agree to the terms and conditions
                applicable to our service and acknowledge that your personal
                data will be used in accordance with our privacy policy and you
                will receive emails and communications about jobs, industry
                news, new products and related topics.
              </Typography>
            </AgreementContainer>

            <Button variant="contained" onClick={handleSignUpSubmit}>
              Sign Up
            </Button>
          </AuthForm>
        </TabPanel>
      </TabContext>
    </AuthContainer>
  );
}

const AuthContainer = styled(Container)(({ theme }) => ({
  width: theme.breakpoints.values.sm,
  margin: '2rem auto',
  padding: '1rem 0',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
}));

const AuthForm = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& input': {
    marginBottom: '1.5rem',
  },
  '& label': {
    margin: '0 0 5px 2.3rem',
    fontWeight: 700,
  },
  '& .MuiButton-root': {
    margin: '2rem auto',
    borderRadius: '8px',
    width: '385px',
    padding: '0.5rem 0',
  },
}));

const AgreementContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '0 2.3rem',
  '& .MuiTypography-root': {
    fontSize: '14px',
    paddingTop: '0.5rem',
  },
}));

export default Auth;
