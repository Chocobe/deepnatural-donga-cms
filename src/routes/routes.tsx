// routers
import { 
  createBrowserRouter,
} from 'react-router-dom';
import routePathFactory from './routePathFactory';
// layouts
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
// pages
import LoginPage from '@/pages/auth/LoginPage/LoginPage';

const routes = createBrowserRouter([
  {
    path: routePathFactory
      .auth
      .getLayoutPath(),
    element: (
      <AuthLayout />
    ),
    children: [
      {
        path: routePathFactory
          .auth
          .getLoginPagePath(),
        element: (
          <LoginPage />
        ),
      },
    ],
  },
]);

export default routes;
