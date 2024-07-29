// react
import {
  memo,
} from 'react';
// router
import { Outlet } from 'react-router-dom';
// layout
import AuthedHeaderLayout from '../AuthedHeaderLayout/AuthedHeaderLayout';
// style
import './DashboardLayout.css';

function _DashboardLayout() {
  return (
    <AuthedHeaderLayout className="DashboardLayout">
      <div className="DashboardLayout-main">
        <Outlet />
      </div>
    </AuthedHeaderLayout>
  );
}

const DashboardLayout = memo(_DashboardLayout);
export default DashboardLayout;
