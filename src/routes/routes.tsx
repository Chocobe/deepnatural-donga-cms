// routers
import { 
  createBrowserRouter,
} from 'react-router-dom';
import routePathFactory from './routePathFactory';
// layouts
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import AuthedLayout from '@/layouts/AuthedLayout/AuthedLayout';
// pages
import LoginPage from '@/pages/auth/LoginPage/LoginPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage/FindPasswordPage';

const routes = createBrowserRouter([
  {
    path: routePathFactory
      .auth
      .getAuthRootPath(),
    element: <AuthLayout />,
    children: [
      {
        path: routePathFactory
          .auth
          .getLoginPagePath(),
        element: <LoginPage />,
      },
      {
        path: routePathFactory
          .auth
          .getFindPasswordPagePath(),
        element: <FindPasswordPage />,
      },
    ],
  },
  {
    path: routePathFactory
      .math
      .getMathRootPath(),
    element: <AuthedLayout />,
    children: [
      {
        path: routePathFactory
          .math
          .getTextbookPath(),
        element: (
          <div style={{
            padding: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 1
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 2
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 3
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 4
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 5
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 6
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 7
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 8
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 9
            </div>
            <div className="w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
              Box 10
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default routes;
