// react
import {
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuSearch,
} from 'react-icons/lu';
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
  isShowSearchIcon?: boolean;
  onOpen: () => void;
};

function _SearchModalTrigger(props: TSearchModalTriggerProps) {
  const {
    className,
    id,
    tabIndex,
    placeholder = '',
    value,
    isShowSearchIcon,
    onOpen,
  } = props;

  return (
    <Button
      id={id}
      className={cn(
        'SearchModalTrigger',
        { showSearchIcon: isShowSearchIcon },
        className
      )}
      variant="link"
      tabIndex={tabIndex}
      onClick={onOpen}>
      <div className={cn(
        'valueWrapper',
        !value ? 'placeholder' : ''
      )}>
        <span className="value">
          {value || placeholder}
        </span>

        {isShowSearchIcon && (
          <LuSearch className="icon" />
        )}
      </div>
    </Button>
  );
}

const SearchModalTrigger = memo(_SearchModalTrigger) as typeof _SearchModalTrigger;
export default SearchModalTrigger;
