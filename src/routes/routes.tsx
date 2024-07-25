// router
import { 
  createBrowserRouter,
} from 'react-router-dom';
// pages
import HelloWorldPage from '@/components/pages/HelloWorldPage/HelloWorldPage';
import LoginPage from '@/components/pages/LoginPage/LoginPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HelloWorldPage />,
    children: [
      {
        path: ':id',
        element: (
          <div>
            :id child page
          </div>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default routes;
