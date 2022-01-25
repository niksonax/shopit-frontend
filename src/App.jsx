import './App.scss';
import { ThemeProvider } from '@mui/material';
import { Header } from './components';
import { Routing } from './routing/Routing';
import mainTheme from './shared/styles/mainTheme';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <div className="app">
        <Header />
        <Routing />
      </div>
    </ThemeProvider>
  );
}

// Redux toolkit
// Redux toolkit query

export default App;
