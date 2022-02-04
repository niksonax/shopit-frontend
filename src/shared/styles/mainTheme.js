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
    h6: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: '8px',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        outlined: {
          borderColor: '#2E1AAD',
        },
      },
    },
  },
});

export default mainTheme;
