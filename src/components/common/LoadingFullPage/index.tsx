import { Backdrop, CircularProgress } from '@mui/material';

type Props = {
  isLoading: boolean;
};

const LoadingFullPage = ({ isLoading }: Props) => {
  return (
    <Backdrop
      sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingFullPage;
