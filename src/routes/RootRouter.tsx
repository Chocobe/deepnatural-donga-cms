// router
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

function RootRouter() {
  return (
    <RouterProvider router={routes} />
  );
}

export default RootRouter;
