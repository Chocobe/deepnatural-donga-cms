// react
import {
  memo,
  PropsWithChildren,
} from 'react';
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

  return (
    <div className={cn(
      'AuthedSidebarLayout',
      className
    )}>
      <div className={cn(
        'AuthedSidebarLayout-sidebar',
        'p-5 flex flex-col items-center gap-5'
      )}>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 1
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 2
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 3
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 4
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 5
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 6
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 7
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 8
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 9
        </div>
        <div className="shrink-0 w-[150px] h-[150px] flex justify-end items-end bg-sky-200">
          Box 10
        </div>
      </div>

      <div className="AuthedSidebarLayout-main">
        {children}
      </div>
    </div>
  );
}

const AuthedSidebarLayout = memo(_AuthedSidebarLayout);
export default AuthedSidebarLayout;
