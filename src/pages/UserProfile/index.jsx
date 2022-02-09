import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Avatar,
  Typography,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { selectCurrentUser } from '../../shared/reducers/user';
import UserDashboard from './UserDashboard';

function UserProfile() {
  const { id, name, email } = useSelector(selectCurrentUser);

  return (
    <UserProfileContainer>
      <Grid container rowSpacing={4}>
        <Grid item xs={3} />
        <Grid item xs={6} justifyContent="center">
          <UserInfo>
            <Avatar>{name ? name : null}</Avatar>
            <Typography variant="h5">{name}</Typography>
            <Typography>{email}</Typography>
          </UserInfo>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={3} />
        <Grid item xs={6}>
          {id ? <UserDashboard userId={id} /> : <CircularProgress />}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </UserProfileContainer>
  );
}

const UserProfileContainer = styled(Container)(() => ({
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  '& .MuiAvatar-root': {
    width: 128,
    height: 128,
    marginBottom: '1rem',
  },
}));

const UserInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 2rem',
}));

export default UserProfile;
