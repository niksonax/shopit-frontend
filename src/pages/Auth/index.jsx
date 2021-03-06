import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { ThanksForRegistration } from './ThanksForRegistration';
import { STATES, FIELDS } from './constants';
import { validateLoginData, validateSignUpData } from '../../shared/helpers';
import { useLoginMutation, useRegisterMutation } from '../../shared/api/auth';
import { ROUTES } from '../../routing/routes';

function Auth() {
  const location = useLocation();
  const navigation = useNavigate();

  const [login, loginStatus] = useLoginMutation();
  const [register, registerStatus] = useRegisterMutation();

  const [pageState, setPageState] = useState(STATES.LOGIN);
  const [userData, setUserData] = useState({
    [FIELDS.NAME]: '',
    [FIELDS.EMAIL]: '',
    [FIELDS.PASSWORD]: '',
    [FIELDS.PASSWORD_CONFIRM]: '',
    [FIELDS.AGREEMENT]: false,
  });
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

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

  const handleLoginSubmit = async () => {
    try {
      validateLoginData(userData[FIELDS.EMAIL], userData[FIELDS.PASSWORD]);
      setLoginError(null);

      const { error } = await login({
        email: userData[FIELDS.EMAIL],
        password: userData[FIELDS.PASSWORD],
      });

      if (error) {
        throw new Error(error.data.error);
      }

      navigation(ROUTES.HOME);
    } catch (error) {
      setLoginError(error);
    }
  };
  const handleSignUpSubmit = async () => {
    try {
      validateSignUpData(
        userData[FIELDS.NAME],
        userData[FIELDS.EMAIL],
        userData[FIELDS.PASSWORD],
        userData[FIELDS.PASSWORD_CONFIRM],
        userData[FIELDS.AGREEMENT]
      );
      setSignUpError(null);

      const { error } = await register({
        name: userData[FIELDS.NAME],
        email: userData[FIELDS.EMAIL],
        password: userData[FIELDS.PASSWORD],
      });

      if (error) {
        throw new Error(error.data.error);
      }

      setSignUpSuccess(true);
    } catch (error) {
      setSignUpError(error);
    }
  };

  useEffect(() => {
    if (location.state) {
      setPageState(location.state.page);
    }
  }, [location]);

  return (
    <AuthContainer>
      {signUpSuccess ? (
        <ThanksForRegistration />
      ) : (
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

              {loginError && (
                <InputLabel error>{loginError.message}</InputLabel>
              )}

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
                  data will be used in accordance with our privacy policy and
                  you will receive emails and communications about jobs,
                  industry news, new products and related topics.
                </Typography>
              </AgreementContainer>

              {signUpError && (
                <InputLabel error>{signUpError.message}</InputLabel>
              )}

              <Button variant="contained" onClick={handleSignUpSubmit}>
                Sign Up
              </Button>
            </AuthForm>
          </TabPanel>
        </TabContext>
      )}
    </AuthContainer>
  );
}

const AuthContainer = styled(Container)(({ theme }) => ({
  width: theme.breakpoints.values.sm,
  margin: '2rem auto',
  padding: '1rem 0',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
  '& .MuiTab-root': {
    fontWeight: 600,
    fontSize: '16px',
  },
}));

const AuthForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& input': {
    marginBottom: '1.5rem',
  },
  '& label': {
    display: 'inline-block',
    width: '386px',
    marginBottom: '5px',
    fontWeight: 700,
  },
  '& label .Mui-error': {},
  '& .MuiButton-root': {
    margin: '2rem auto',
    width: '386px',
    padding: '0.5rem 0',
  },
}));

const AgreementContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '1.5rem',
  width: '386px',
  '& .MuiTypography-root': {
    fontSize: '14px',
    paddingTop: '0.5rem',
  },
}));

export default Auth;
