// react
import {
  memo,
  PropsWithChildren,
} from 'react';
// hook
import useSidebarItems from './hooks/useSidebarItems';
// ui
import { Button } from '@/components/shadcn-ui/ui/button';
// style
import { cn } from '@/lib/shadcn-ui-utils';
import './AuthedSidebarLayout.css';

type TAuthedSidebarLayoutProps = PropsWithChildren<{
  className?: string;
}>;

function _AuthedSidebarLayout(props: TAuthedSidebarLayoutProps) {
  const {
    className = '',
    children,
  } = props;

  //
  // hook
  //
  const {
    sidebarItems,
  } = useSidebarItems();

  return (
    <div className={cn(
      'AuthedSidebarLayout',
      className
    )}>
      <div className="AuthedSidebarLayout-sidebar">
        {sidebarItems?.map(item => {
          const {
            text,
            IconComponent,
            isActive,
            onClick,
          } = item;

          return (
            <Button
              key={text}
              className={cn(
                'AuthedSidebarLayout-sidebar-button',
                isActive ? 'active' : ''
              )}
              onClick={onClick}
            >
              <IconComponent className="AuthedSidebarLayout-sidebar-button-icon" />
              <span className="">
                {text}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="AuthedSidebarLayout-main">
        {children}
      </div>
    </div>
  );
}

const AuthedSidebarLayout = memo(_AuthedSidebarLayout);
export default AuthedSidebarLayout;
