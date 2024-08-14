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
import MathTextbookDetailPage from '@/pages/math/MathTextbookDetailPage/MathTextbookDetailPage';
import MathChapterPage from '@/pages/math/MathChapterPage/MathChapterPage';
import MathAchievementPage from '@/pages/math/MathAchievementPage/MathAchievementPage';
import MathKnowledgeConceptPage from '@/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptPage';
import MathSeriesSourcePage from '@/pages/math/MathSeriesSourcePage/MathSeriesSourcePage';
import MathInstructionPage from '@/pages/math/MathInstructionPage/MathInstruction';
import MathQuestionPage from '@/pages/math/MathQuestionPage/MathQuestionPage';
// pages - english
import EnglishTextbookPage from '@/pages/english/EnglishTextbookPage/EnglishTextbookPage';
import EnglishChapterPage from '@/pages/english/EnglishChapterPage/EnglishChapterPage';
import EnglishAchievementPage from '@/pages/english/EnglishAchievementPage/EnglishAchievementPage';
import EnglishKnowledgeConceptPage from '@/pages/english/EnglishKnowledgeConceptPage/EnglishKnowledgeConceptPage';
import EnglishSeriesSourcePage from '@/pages/english/EnglishSeriesSourcePage/EnglishSeriesSourcePage';
import EnglishInstructionPage from '@/pages/english/EnglishInstructionPage/EnglishInstructionPage';
import EnglishQuestionPage from '@/pages/english/EnglishQuestionPage/EnglishQuestionPage';
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
          // 수학: 교과서
          {
            path: routePathFactory
              .math
              .getTextbookPath(),
            element: <MathTextbookPage />,
          },
          {
            path: routePathFactory
              .math
              .getTextbookDetailPath(':id'),
            element: <MathTextbookDetailPage />,
          },
          // 수학: 단원정보
          {
            path: routePathFactory
              .math
              .getChapterPath(),
            element: <MathChapterPage />,
          },
          // 수학: 성취기준
          {
            path: routePathFactory
              .math
              .getAchievementPath(),
            element: <MathAchievementPage />,
          },
          // 수학: 지식개념
          {
            path: routePathFactory
              .math
              .getKnowledgeConceptPath(),
            element: <MathKnowledgeConceptPage />,
          },
          // 수학: 시리즈-출처
          {
            path: routePathFactory
              .math
              .getSeriesSourcePath(),
            element: <MathSeriesSourcePage />,
          },
          // 수학: 지문
          {
            path: routePathFactory
              .math
              .getInstructionPath(),
            element: <MathInstructionPage />,
          },
          // 수학: 문항
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
          // 영어: 교과서
          {
            path: routePathFactory
              .english
              .getTextbookPath(),
            element: <EnglishTextbookPage />,
          },
          // 영어: 단원정보
          {
            path: routePathFactory
              .english
              .getChapterPath(),
            element: <EnglishChapterPage />,
          },
          // 영어: 성취기준
          {
            path: routePathFactory
              .english
              .getAchievementPath(),
            element: <EnglishAchievementPage />,
          },
          // 영어: 지식개념
          {
            path: routePathFactory
              .english
              .getKnowledgeConceptPath(),
            element: <EnglishKnowledgeConceptPage />,
          },
          // 영어: 시리즈-출처
          {
            path: routePathFactory
              .english
              .getSeriesSourcePath(),
            element: <EnglishSeriesSourcePage />,
          },
          // 영어: 지문
          {
            path: routePathFactory
              .english
              .getInstructionPath(),
            element: <EnglishInstructionPage />,
          },
          // 영어: 문항
          {
            path: routePathFactory
              .english
              .getQuestionPath(),
            element: <EnglishQuestionPage />,
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
