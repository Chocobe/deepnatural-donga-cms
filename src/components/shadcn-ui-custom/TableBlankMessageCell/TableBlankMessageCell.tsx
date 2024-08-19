// react
import {
  memo,
} from 'react';
// ui
import { 
  TableCell,
} from '@/components/shadcn-ui/ui/table';
// style
import './TableBlankMessageCell.css';

type TTableBlankMessageCellProps = {
  colSpan?: number;
  children: string;
};

function _TableBlankMessageCell(props: TTableBlankMessageCellProps) {
  const {
    colSpan,
    children,
  } = props;

  return (
    <TableCell
      className="TableBlankMessageCell"
      colSpan={colSpan}>
      {children}
    </TableCell>
  );
}

const TableBlankMessageCell = memo(_TableBlankMessageCell) as typeof _TableBlankMessageCell;
export default TableBlankMessageCell;
