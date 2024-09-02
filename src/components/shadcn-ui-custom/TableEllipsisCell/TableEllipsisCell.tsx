// react
import {
  memo,
  PropsWithChildren,
  CSSProperties,
} from 'react';
// style
import './TableEllipsisCell.css';

type TTableEllipsisCellProps = PropsWithChildren<{
  maxRows?: number;
}>;

function _TableEllipsisCell(props: TTableEllipsisCellProps) {
  const {
    maxRows = 3,
    children,
  } = props;

  return (
    <div 
      className="TableEllipsisCell"
      style={{
        '--max-rows': maxRows,
      } as CSSProperties}>
      {children}
    </div>
  );
}

const TableEllipsisCell = memo(_TableEllipsisCell) as typeof _TableEllipsisCell;
export default TableEllipsisCell;
