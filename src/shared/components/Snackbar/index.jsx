import { Snackbar } from '@mui/material';
import { styled } from '@mui/system';

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.common.white,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  '& .MuiSnackbarContent-message': {
    fontWeight: 500,
  },
}));

export default CustomSnackbar;
