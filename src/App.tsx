import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoute from 'routers';

function App() {
  return (
    <>
      <CssBaseline />
      <AppRoute />
      <ToastContainer />
    </>
  );
}

export default App;
