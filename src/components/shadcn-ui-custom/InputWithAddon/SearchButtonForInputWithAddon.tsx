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

type TSearchButtonForInputWithAddon = {
  className?: string;
  onClick: () => void;
};

function _SearchButtonForInputWithAddon(props: TSearchButtonForInputWithAddon) {
  const {
    className,
    onClick,
  } = props;

  return (
    <Button
      className={cn(
        className,
        'p-0 w-7 h-7 right-1.5'
      )}
      variant="outline"
      onClick={onClick}>
      <LuSearch />
    </Button>
  );
}

const SearchButtonForInputWithAddon = memo(_SearchButtonForInputWithAddon);
export default SearchButtonForInputWithAddon;
