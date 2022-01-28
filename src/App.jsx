import { ThemeProvider, Box } from '@mui/material';
import { Header } from './components';
import { Routing } from './routing/Routing';
import { AuthProvider } from './shared/hooks';
import mainTheme from './shared/styles/mainTheme';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <Box>
          <Header />
          <Routing />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
