import { Grid } from '@mui/material';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { APP_ROUTES } from 'constant/app-routes';

interface Props {
  isLoggedIn: boolean;
  redirectPath?: string;
  children: any;
  isReset?: boolean;
}

const PrivateRoute = ({
  isLoggedIn,
  redirectPath = APP_ROUTES.LOGIN,
  children,
  isReset,
}: Props) => {
  const location = useLocation();

  if (!isLoggedIn && !isReset) {
    return (
      <Navigate to={redirectPath} replace state={{ path: location.pathname }} />
    );
  }

  return (
    <Suspense fallback={<Grid />}>{children ? children : <Outlet />}</Suspense>
  );
};

export default PrivateRoute;
