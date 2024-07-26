// react
import {
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
// shadcn
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/shadcn-ui/ui/dropdown-menu';
import { Button } from '@/components/shadcn-ui/ui/button';
// react-icons
import { CiLogout } from 'react-icons/ci';
// style
import './AccountAction.css';
import { cn } from '@/lib/shadcn-ui-utils';
import routePathFactory from '@/routes/routePathFactory';

function _AccountAction() {
  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const logout = useCallback(() => {
    navigate(routePathFactory.auth.getLoginPagePath());
  }, [navigate]);

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
              {/* FIXME: 사용자 email 적용하기 */}
              michelle@bookdonga.com
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuItem 
            className="AccountAction-dropdown-item"
            onClick={() => console.log('onClick()')}>
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
