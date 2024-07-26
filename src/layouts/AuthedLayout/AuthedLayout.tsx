// react
import {
  memo,
} from 'react';
// router
import { Outlet } from 'react-router-dom';
// layout
import AuthedHeaderLayout from '../AuthedHeaderLayout/AuthedHeaderLayout';
import AuthedSidebarLayout from '../AuthedSidebarLayout/AuthedSidebarLayout';
// style
import './AuthedLayout.css';

function _AuthedLayout() {
  return (
    <AuthedHeaderLayout className="AuthedLayout">
      <AuthedSidebarLayout className="AuthedLayout-inner">
        <div className="AuthedLayout-main">
          <Outlet />
        </div>
      </AuthedSidebarLayout>
    </AuthedHeaderLayout>
  );

  // return (
  //   <AuthedSidebarLayout className="AuthedLayout">
  //     <AuthedHeaderLayout className="AuthedLayout-inner">
  //       <div className="AuthedLayout-main">
  //         <Outlet />
  //       </div>
  //     </AuthedHeaderLayout>
  //   </AuthedSidebarLayout>
  // );
}

const AuthedLayout = memo(_AuthedLayout);
export default AuthedLayout;
