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
  LuChevronDown,
} from 'react-icons/lu';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './SearchModalTrigger.css';

type TSearchModalTriggerProps = {
  className?: string;
  id: string;
  value: string;
  onOpen: () => void;
};

function _SearchModalTrigger(props: TSearchModalTriggerProps) {
  const {
    className,
    id,
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
      onClick={onOpen}>
      <div className="value">
        {value}
      </div>

      <LuChevronDown className="icon" />
    </Button>
  );
}

const SearchModalTrigger = memo(_SearchModalTrigger) as typeof _SearchModalTrigger;
export default SearchModalTrigger;
