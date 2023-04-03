import { ThemeProvider, useTheme } from '@mui/material';

function ThemeProviderMock({ children }: any) {
  const theme = useTheme();
  //   const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeProviderMock;
