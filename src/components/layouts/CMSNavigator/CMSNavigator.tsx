// react
import {
  memo,
} from 'react';
// hooko
import useCMSNavigatorItems from './hooks/useCMSNavigator';
import { Button } from '@/components/shadcn-ui/ui/button';
// style
import { cn } from '@/lib/shadcn-ui-utils';
import './CMSNavigator.css';

function _CMSNavigator() {
  //
  // hook
  //
  const { cmsNavigatorItems } = useCMSNavigatorItems();

  return (
    <div className="CMSNavigator">
      {cmsNavigatorItems.map(item => {
        const {
          text,
          isActive,
          onClick,
        } = item;

        return (
          <Button
            key={text}
            className={cn(
              'CMSNavigator-button',
              isActive ? 'active' : ''
            )}
            variant="ghost"
            onClick={onClick}>
            {text}
          </Button>
        );
      })}
    </div>
  );
}

const CMSNavigator = memo(_CMSNavigator);
export default CMSNavigator;
