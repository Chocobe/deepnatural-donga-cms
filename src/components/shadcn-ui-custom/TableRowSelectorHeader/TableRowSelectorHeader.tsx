// react
import {
  useMemo,
  useCallback,
} from 'react';
// ui
import {
  HeaderContext,
} from '@tanstack/react-table';
import { 
  Checkbox,
  CHECKBOX_INDETERMINATE,
} from '@/components/shadcn-ui/ui/checkbox';
import { 
  CheckedState,
} from '@radix-ui/react-checkbox';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './TableRowSelectorHeader.css';

type TTableRowSelectorHeaderProps<T extends object> = HeaderContext<T, unknown> & {
  className?: string;
};

function TableRowSelectorHeader<T extends object>(
  props: TTableRowSelectorHeaderProps<T>
) {
  const {
    className,
    ..._props
  } = props;

  const checked = useMemo(() => {
    return _props.table.getIsAllRowsSelected() || (
      _props.table.getIsSomeRowsSelected() && CHECKBOX_INDETERMINATE
    );
  }, [_props]);

  //
  // callback
  //
  const onChange = useCallback((checked: CheckedState) => {
    _props.table.getToggleAllRowsSelectedHandler()({
      target: {
        checked,
      },
    });
  }, [_props]);

  return (
    <Checkbox
      className={cn(
        'TableRowSelectorHeader',
        className,
      )}
      checked={checked}
      onCheckedChange={onChange}
      aria-label="Select all" />
  );
}

export default TableRowSelectorHeader;
