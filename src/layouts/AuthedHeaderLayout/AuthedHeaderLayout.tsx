// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// components
import CMSNavigator from '@/components/layouts/CMSNavigator/CMSNavigator';
import AccountAction from '@/components/layouts/AccountAction/AccountAction';
// style
import { cn } from '@/lib/shadcn-ui-utils';
import './AuthedHeaderLayout.css';

// FIXME: mockup
import MockSuperAdminSwitch from './MockSuperAdminSwitch';

type TAuthedHeaderLayoutProps = PropsWithChildren<{
  className?: string;
}>;

function _AuthedHeaderLayout(props: TAuthedHeaderLayoutProps) {
  const {
    className = '',
    children,
  } = props;

  return (
    <div className={cn(
      'AuthedHeaderLayout',
      className
    )}>
      <header className="AuthedHeaderLayout-header">
        <div className="AuthedHeaderLayout-header-left">
          <img
            className="logo"
            src="/images/donga-logo-gray-scale.png"
            alt="동아출판" />
          <div className="logoTitle">
            수학 CMS
          </div>
        </div>

        <div className="AuthedHeaderLayout-header-center">
          <CMSNavigator />
        </div>

        <div className="AuthedHeaderLayout-header-right">
          <MockSuperAdminSwitch />
          <AccountAction />
        </div>
      </header>

      <div className="AuthedHeaderLayout-main">
        {children}
      </div>
    </div>
  );
}

const AuthedHeaderLayout = memo(_AuthedHeaderLayout);
export default AuthedHeaderLayout;
