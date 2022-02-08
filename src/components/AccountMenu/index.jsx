import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Divider,
  Avatar,
  Typography,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { Person, Logout } from '@mui/icons-material';
import { useLogoutMutation } from '../../shared/api/auth';
import { selectCurrentUser } from '../../shared/reducers/user';
import { ROUTES } from '../../routing/routes';

function AccountMenu() {
  const navigation = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { name, email } = useSelector(selectCurrentUser);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigation(ROUTES.HOME);
  };

  return (
    <React.Fragment>
      <MenuBox>
        <Typography>
          Hi, <Typography variant="span">{name}</Typography>
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={isOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : undefined}
          >
            <Avatar>{name[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </MenuBox>
      <DropdownContainer
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{ elevation: 0 }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography fontWeight={600}>{name}</Typography>
          <Typography>{email}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link to={ROUTES.PROFILE}>
            <Box display="flex" alignItems="center">
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Account
            </Box>
          </Link>
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </DropdownContainer>
    </React.Fragment>
  );
}

const MenuBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  marginLeft: 'auto',
  '& .MuiTypography-root': {
    fontSize: '18px',
  },
  '& .MuiTypography-span': {
    fontWeight: 700,
  },
  '& .MuiIconButton-root': {
    marginLeft: '1rem',
  },
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
  },
}));

const DropdownContainer = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    width: '200px',
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
    '& a': {
      textDecoration: 'none',
      display: 'inline-block',
      width: '100%',
      color: theme.palette.common.black,
    },
  },
}));

export default AccountMenu;
