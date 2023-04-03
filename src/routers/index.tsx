import { ACCESS_TOKEN, ORG_TOKEN } from 'constant/global';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { APP_ROUTES } from 'constant/app-routes';

const AppRoute = () => {
  const Authentication = lazy(() => import('../modules/Login'));
  const Dashboard = lazy(() => import('../modules/Dashboard'));

  const token = localStorage.getItem(ACCESS_TOKEN);
  const org_token = localStorage.getItem(ORG_TOKEN);

  return (
    <Routes>
      <Route
        path={APP_ROUTES.LOGIN}
        element={
          <PrivateRoute
            redirectPath={APP_ROUTES.DASH_BOARD}
            isLoggedIn={!token || !org_token}
          >
            <Authentication />
          </PrivateRoute>
        }
      />
      <Route
        index
        element={
          <PrivateRoute isLoggedIn={Boolean(token) && Boolean(org_token)}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<p>404 Not Found!</p>} />
    </Routes>
  );
};
export default AppRoute;
