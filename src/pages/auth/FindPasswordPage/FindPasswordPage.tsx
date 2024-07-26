// FIXME: mockup page

import { cn } from '@/lib/shadcn-ui-utils';
import { NavLink } from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';

function FindPasswordPage() {
  return (
    <div className={cn(
      'w-full h-full',
      'flex flex-col justify-center items-center gap-5',
    )}>
      <div className="text-center text-lg">
        Find Password Page
      </div>

      <NavLink 
        to={routePathFactory.auth.getLoginPagePath()}
        style={{
          color: '#6366f1',
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: '400',
        }}>
        로그인 페이지
      </NavLink>
    </div>
  );
}

export default FindPasswordPage;
