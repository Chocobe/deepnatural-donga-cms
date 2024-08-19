// react
import {
  useMemo,
  useEffect,
  memo,
  PropsWithChildren,
} from 'react';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
import { 
  createSuccessApiSliceState,
} from '@/store/apiStateUtils';
// hook
import useCMSNavigatorItems from '@/components/layouts/CMSNavigator/hooks/useCMSNavigator';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
// ui
import CMSNavigator from '@/components/layouts/CMSNavigator/CMSNavigator';
import AccountAction from '@/components/layouts/AccountAction/AccountAction';
// api
import ApiManager from '@/apis/ApiManager';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './AuthedHeaderLayout.css';

type TAuthedHeaderLayoutProps = PropsWithChildren<{
  className?: string;
}>;

function _AuthedHeaderLayout(props: TAuthedHeaderLayoutProps) {
  const {
    className = '',
    children,
  } = props;

  //
  // authApi store
  //
  const setGroupsState = useAuthApiStore(state => state.groups.action.setGroupsState);

  //
  // hook
  //
  const {
    cmsNavigatorItems,
  } = useCMSNavigatorItems();

  const {
    isLoggedIn,
  } = useIsLoggedIn();

  //
  // cache
  //
  const logoTitle = useMemo(() => {
    return cmsNavigatorItems
      .find(({ isActive }) => isActive)
      ?.text
      ?? '';
  }, [cmsNavigatorItems]);

  //
  // effect
  //
  useEffect(() => {
    const retrieveGroups = async () => {
      const response = await ApiManager
        .auth
        .retrieveGroupsApi();

      if (response.data) {
        setGroupsState(createSuccessApiSliceState(response.data));
      }
    };

    if (isLoggedIn) {
      console.log('Group 목록 조회');
      retrieveGroups();
    }
  }, [isLoggedIn, setGroupsState]);

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
            {logoTitle}
          </div>
        </div>

        <div className="AuthedHeaderLayout-header-center">
          <CMSNavigator />
        </div>

        <div className="AuthedHeaderLayout-header-right">
          {/* <MockSuperAdminSwitch /> */}
          <AccountAction />
        </div>
      </header>

      <div className="AuthedHeaderLayout-main">
        {children}
      </div>
    </div>
  );
}

const AuthedHeaderLayout = memo(_AuthedHeaderLayout) as typeof _AuthedHeaderLayout;
export default AuthedHeaderLayout;
