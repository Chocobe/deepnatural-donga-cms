// router
import { Outlet, useLoaderData } from 'react-router-dom';
// UI
import { Button } from '../../shadcn-ui/ui/button';
import './helloWorldPage.css';

import useLayoutStore from '@/store/layoutStore/layoutStore';
import { useEffect } from 'react';

function HelloWorldPage() {
  const isOpenSideBar = useLayoutStore(state => state.isOpenSideBar);

  const toggleIsOpenSideBar = useLayoutStore(state => state.toggleIsOpenSideBar);

  const users = useLoaderData();

  useEffect(() => {
    console.group('<HelloWorldPage />');
    console.log('users: ', users);
    console.groupEnd();
  }, [users]);

  useEffect(() => {
    console.log('<HelloWorldPage /> mounted');
  }, []);

  return (
    <div className="HelloWorld">
      <div className="text">
        It's HelloWorld page
      </div>

      <Button
        className="button"
        onClick={() => {
          console.log('onClick() - HelloWorld');
        }}>
        Click me!
      </Button>

      <div>
        <div>
          isOpenSideBar: {String(isOpenSideBar)}
        </div>
        <div>
          <Button onClick={toggleIsOpenSideBar}>
            Toggle isOpenSideBar
          </Button>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default HelloWorldPage;
