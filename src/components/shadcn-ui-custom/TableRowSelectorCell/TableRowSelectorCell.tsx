// react
import {
  useMemo,
  useCallback,
  MouseEvent,
} from 'react';
// ui
import {
  CellContext,
} from '@tanstack/react-table';
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
// style
import './TableRowSelectorCell.css';

type TTableRowSelectorCellProps<T extends object> = CellContext<T, unknown>;

function TableRowSelectorCell<T extends object>(props: TTableRowSelectorCellProps<T>) {
  //
  // cache
  //
  const checked = useMemo(() => {
    return props.row.getIsSelected();
  }, [props]);

  const disabled = useMemo(() => {
    return !props.row.getCanSelect();
  }, [props]);

  //
  // callback
  //
  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  const onChange = useCallback((checked: boolean) => {
    props.row.getToggleSelectedHandler()(checked);
  }, [props]);

  return (
    <Checkbox
      className="TableRowSelectorCell"
      disabled={disabled}
      checked={checked}
      onClick={onClick}
      onCheckedChange={onChange} />
  );
}

export default TableRowSelectorCell;
