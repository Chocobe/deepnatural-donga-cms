// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// style
import { cn } from '@/lib/shadcn-ui-utils';
import './DashboardLayout.css';

type TDashboardLayoutProps = PropsWithChildren<{
  className?: string;
}>;

function _DashboardLayout(props: TDashboardLayoutProps) {
  const {
    className = '',
    children,
  } = props;

  return (
    <div className={cn(
      'DashboardLayout',
      className
    )}>
      {children}
    </div>
  );
}

const DashboardLayout = memo(_DashboardLayout);
export default DashboardLayout;
