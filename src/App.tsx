import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from 'routers';
import './App.css';
import theme from 'theme/theme';
import BackgroundWave1 from 'assets/icons/BackgroundWave1';
import BackgroundWave2 from 'assets/icons/BackgroundWave2';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <AppRoute />
        <ToastContainer />
        <div className="backgroundWave1">
          <BackgroundWave1 />
        </div>
        <div className="backgroundWave2">
          <BackgroundWave2 />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
