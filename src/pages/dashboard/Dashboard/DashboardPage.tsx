// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _DashboardPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="Dashboard Page mockup" />
  );
}

const DashboardPage = memo(_DashboardPage);
export default DashboardPage;
