// routers
import { 
  createBrowserRouter,
  Outlet,
} from 'react-router-dom';
import routePathFactory from './routePathFactory';
// middlewares
import AuthGuardMiddleware from '@/middlewares/AuthGuardMiddleware/AuthGuardMiddleware';
import LoginRedirectMiddleware from '@/middlewares/LoginRedirectMiddleware/LoginRedirectMiddleware';
// layouts
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout/DashboardLayout';
import AuthedHeaderLayout from '@/layouts/AuthedHeaderLayout/AuthedHeaderLayout';
import AuthedSidebarLayout from '@/layouts/AuthedSidebarLayout/AuthedSidebarLayout';
// pages - auth
import LoginPage from '@/pages/auth/LoginPage/LoginPage';
// pages - dashboard
import DashboardPage from '@/pages/dashboard/Dashboard/DashboardPage';
// pages - math
import MathTextbookPage from '@/pages/math/MathTextbookPage/MathTextbookPage';
import MathChapterPage from '@/pages/math/MathChapterPage/MathChapterPage';
import MathAchievementPage from '@/pages/math/MathAchievementPage/MathAchievementPage';
import MathKnowledgeConceptPage from '@/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptPage';
import MathSeriesSourcePage from '@/pages/math/MathSeriesSourcePage/MathSeriesSourcePage';
import MathInstructionPage from '@/pages/math/MathInstructionPage/MathInstruction';
import MathQuestionPage from '@/pages/math/MathQuestionPage/MathQuestionPage';
// pages - english
import EnglishTextbookPage from '@/pages/english/EnglishTextbookPage/EnglishTextbookPage';
// pages - setting
import MyPage from '@/pages/setting/MyPage/MyPage';
import SuperAdminPage from '@/pages/setting/SuperAdminPage/SuperAdminPage';

const routes = createBrowserRouter([
  // Auth
  {
    path: routePathFactory
      .auth
      .getAuthRootPath(),
    element: (
      <AuthGuardMiddleware>
        <AuthLayout />
      </AuthGuardMiddleware>
    ),
    children: [
      {
        path: routePathFactory
          .auth
          .getLoginPagePath(),
        element: <LoginPage />,
      },
    ],
  }, // Auth

  // CMS
  {
    path: '/',
    element: (
      <LoginRedirectMiddleware>
        <AuthedHeaderLayout>
          <Outlet />
        </AuthedHeaderLayout>
      </LoginRedirectMiddleware>
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
            element: <DashboardPage />,
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
            element: <MathTextbookPage />,
          },
          {
            path: routePathFactory
              .math
              .getChapterPath(),
            element: <MathChapterPage />,
          },
          {
            path: routePathFactory
              .math
              .getAchievementPath(),
            element: <MathAchievementPage />,
          },
          {
            path: routePathFactory
              .math
              .getKnowledgeConceptPath(),
            element: <MathKnowledgeConceptPage />,
          },
          {
            path: routePathFactory
              .math
              .getSeriesSourcePath(),
            element: <MathSeriesSourcePage />,
          },
          {
            path: routePathFactory
              .math
              .getInstructionPath(),
            element: <MathInstructionPage />,
          },
          {
            path: routePathFactory
              .math
              .getQuestionPath(),
            element: <MathQuestionPage />,
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
            element: <EnglishTextbookPage />,
          },
        ],
      }, // English CMS

      // Setting
      {
        path: routePathFactory
          .setting
          .getSettingRootPath(),
        element: (
          <AuthedSidebarLayout>
            <Outlet />
          </AuthedSidebarLayout>
        ),
        children: [
          {
            path: routePathFactory
              .setting
              .getMyPagePath(),
            element: <MyPage />,
          },
          {
            path: routePathFactory
              .setting
              .getSuperAdminPagePath(),
            element: <SuperAdminPage />,
          },
        ],
      }, // Setting
    ],
  }, // CMS
]);

export default routes;
