import { ThemeProvider, Box } from '@mui/material';
import { Header } from './components';
import { Routing } from './routing/Routing';
import mainTheme from './shared/styles/mainTheme';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Box>
        <Header />
        <Routing />
      </Box>
    </ThemeProvider>
  );
}

// Redux toolkit
// Redux toolkit query

export default App;
