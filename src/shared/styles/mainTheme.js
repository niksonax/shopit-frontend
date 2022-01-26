import { createTheme } from '@mui/material/styles';

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#2E1AAD',
    },
    common: {
      grey: '#999999',
    },
    background: {
      default: '#F5F7FA',
    },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
  },
});

export default mainTheme;
