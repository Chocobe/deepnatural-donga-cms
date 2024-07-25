// router
import { 
  createBrowserRouter,
} from 'react-router-dom';
// pages
import HelloWorldPage from '@/components/pages/HelloWorldPage/HelloWorldPage';
import LoginPage from '@/components/pages/LoginPage/LoginPage';
// api
import { retrieveUsersAPI } from '@/apis/jsonplaceholderAPI/jsonplaceholderAPI';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <HelloWorldPage />,
    loader: async () => {
      console.log('loder 시작');

      const users = await retrieveUsersAPI();

      console.log('loader - api 응답 완료');

      return {
        users,
      };
    },
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
