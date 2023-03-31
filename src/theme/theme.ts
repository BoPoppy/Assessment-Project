import { createTheme } from '@mui/material/styles';

// Define your custom theme here
const theme = createTheme({
  // Set your custom theme options here
  typography: {
    htmlFontSize: 14,
    fontSize: 12,
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
    button: {
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
    h1: {
      fontSize: '6rem',
      '@media (max-width:600px)': {
        fontSize: '3.75rem',
      },
      '@media (max-width:400px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '3.75rem',
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
      '@media (max-width:400px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:400px)': {
        fontSize: '1.25rem',
      },
    },
  },
});

export default theme;
