import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from 'routers';
import './App.css';
import theme from 'theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <AppRoute />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
