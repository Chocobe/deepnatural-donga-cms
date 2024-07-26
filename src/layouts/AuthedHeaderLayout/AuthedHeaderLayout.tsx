// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// style
import { cn } from '@/lib/shadcn-ui-utils';
import './AuthedHeaderLayout.css';

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
        Header
      </header>

      {children}
    </div>
  );
}

const AuthedHeaderLayout = memo(_AuthedHeaderLayout);
export default AuthedHeaderLayout;
