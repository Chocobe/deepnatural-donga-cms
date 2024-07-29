// routers
import { 
  createBrowserRouter,
  Outlet,
} from 'react-router-dom';
import routePathFactory from './routePathFactory';
// layouts
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import AuthedHeaderLayout from '@/layouts/AuthedHeaderLayout/AuthedHeaderLayout';
import AuthedSidebarLayout from '@/layouts/AuthedSidebarLayout/AuthedSidebarLayout';
// pages
import LoginPage from '@/pages/auth/LoginPage/LoginPage';
import FindPasswordPage from '@/pages/auth/FindPasswordPage/FindPasswordPage';

const routes = createBrowserRouter([
  // Auth
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
  }, // Auth

  // CMS
  {
    path: '',
    element: (
      <AuthedHeaderLayout>
        <Outlet />
      </AuthedHeaderLayout>
    ),
    children: [
      // Dashboard
      {
        path: routePathFactory
          .dashboard
          .getDashboardRootPath(),
        element: (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        ),
        children: [
          {
            path: routePathFactory
              .dashboard
              .getDashboardPagePath(),
            element: (
              <div className="p-5 flex flex-col justify-center items-center gap-5">
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 1
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 2
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 3
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 4
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 5
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 6
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 7
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 8
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 9
                </div>
                <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                  Box 10
                </div>
              </div>
            )
          }
        ]
      }, // Dashboard

      // Math CMS
      {
        path: routePathFactory
          .math
          .getMathRootPath(),
        element: (
          <AuthedSidebarLayout>
            <Outlet />
          </AuthedSidebarLayout>
        ),
        children: [
          {
            path: routePathFactory
              .math
              .getTextbookPath(),
            element: (
              <div style={{
                padding: '20px',
                height: '100%',
                overflow: 'hidden',
              }}>
                <div className="h-full flex flex-col gap-5 overflow-auto">
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 1
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 2
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 3
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 4
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 5
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 6
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 7
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 8
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 9
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    Box 10
                  </div>
                </div>
              </div>
            ),
          },
        ],
      }, // Math CMS

      // English CMS
      {
        path: routePathFactory
          .english
          .getEnglishRootPath(),
        element: (
          <AuthedSidebarLayout>
            <Outlet />
          </AuthedSidebarLayout>
        ),
        children: [
          {
            path: routePathFactory
              .english
              .getTextbookPath(),
            element: (
              <div style={{
                height: '100%',
                overflow: 'hidden',
              }}>
                <div className="p-5 h-full flex flex-col gap-5 overflow-auto">
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 1
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 2
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 3
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 4
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 5
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 6
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 7
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 8
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 9
                  </div>
                  <div className="flex-shrink-0 w-[300px] h-[300px] flex justify-end items-end bg-sky-200">
                    EN Box 10
                  </div>
                </div>
              </div>
            ),
          },
        ],
      }, // English CMS
    ],
  }, // CMS
]);

export default routes;
