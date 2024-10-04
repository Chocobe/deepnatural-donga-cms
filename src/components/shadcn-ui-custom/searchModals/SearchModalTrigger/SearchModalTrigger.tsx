// react
import {
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './SearchModalTrigger.css';

type TSearchModalTriggerProps = {
  className?: string;
  id: string;
  tabIndex?: number;
  placeholder?: string;
  value: string;
  onOpen: () => void;
};

function _SearchModalTrigger(props: TSearchModalTriggerProps) {
  const {
    className,
    id,
    tabIndex,
    placeholder = '',
    value,
    onOpen,
  } = props;

  return (
    <Button
      id={id}
      className={cn(
        'SearchModalTrigger',
        className
      )}
      variant="link"
      tabIndex={tabIndex}
      onClick={onOpen}>
      <div className={cn(
        'value',
        !value ? 'placeholder' : ''
      )}>
        {value || placeholder}
      </div>
    </Button>
  );
}

const SearchModalTrigger = memo(_SearchModalTrigger) as typeof _SearchModalTrigger;
export default SearchModalTrigger;
