// react
import {
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
// shadcn
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/shadcn-ui/ui/dropdown-menu';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// react-icons
import { 
  CiLogout,
} from 'react-icons/ci';
// api
import ApiManager from '@/apis/ApiManager';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './AccountAction.css';

function _AccountAction() {
  //
  // authApi store
  //
  const userInfo = useAuthApiStore(state => state.userInfo.state.data);
  const {
    email,
    username,
  } = userInfo ?? {};

  const removeLoginState = useAuthApiStore(state => state.login.action.removeLoginState);
  const clearUserInfoState = useAuthApiStore(state => state.userInfo.action.clearUserInfoState);
  const clearGroupsState = useAuthApiStore(state => state.groups.action.clearGroupsState);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const goToMyPage = useCallback(() => {
    navigate(routePathFactory
      .setting
      .getMyPagePath()
    );
  }, [navigate]);

  const logout = useCallback(async () => {
    await ApiManager
      .auth
      .logoutApi
      .callWithNoticeMessageGroup();

    removeLoginState();
    clearUserInfoState();
    clearGroupsState();
  }, [removeLoginState, clearUserInfoState, clearGroupsState]);

  return (
    <div className="AccountAction">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className={cn(
              'AccountAction-dropdown-trigger',
              'p-0 w-fit h-fit hover:bg-inherit focus-visible:ring-offset-0',
            )}
            variant="ghost">
            <img
              className="AccountAction-dropdown-trigger-avata"
              src="/images/avata-unknown.jpg"
              alt="계정 메뉴" />

            <div className="AccountAction-dropdown-trigger-email">
              {email || username || ''}
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuItem 
            className="AccountAction-dropdown-item"
            onClick={goToMyPage}>
            My page
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="AccountAction-divider" />

      <Button
        className={cn(
          'AccountAction-logoutButton',
          'p-0 w-12 h-12 hover:bg-inherit'
        )}
        variant="ghost"
        onClick={logout}>
        <CiLogout className="AccountAction-logoutButton-icon" />
      </Button>
    </div>
  );
}

const AccountAction = memo(_AccountAction);
export default AccountAction;
