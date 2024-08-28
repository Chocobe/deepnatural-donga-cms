// react
import {
  memo,
} from 'react';
// ui
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuChevronDown,
} from 'react-icons/lu';
// style
import './SearchModalTrigger.css';

type TSearchModalTriggerProps = {
  id: string;
  label: string;
  value: string;
  onOpen: () => void;
};

function _SearchModalTrigger(props: TSearchModalTriggerProps) {
  const {
    id,
    label,
    value,
    onOpen,
  } = props;

  return (
    <div
      className="SearchModalTrigger">
      <Label
        htmlFor={id}
        className="label">
        {label}
      </Label>

      <Button
        id={id}
        className="button"
        variant="link"
        onClick={onOpen}>
        <div className="value">
          {value}
        </div>
        <LuChevronDown className="icon" />
      </Button>
    </div>
  );
}

const SearchModalTrigger = memo(_SearchModalTrigger) as typeof SearchModalTrigger;
export default SearchModalTrigger;
