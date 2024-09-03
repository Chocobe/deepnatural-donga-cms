// react
import {
  useRef,
  memo,
} from 'react';
// ui
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
import TableBlankMessageCell from '@/components/shadcn-ui-custom/TableBlankMessageCell/TableBlankMessageCell';
// style
import './SearchModalTable.css';

type TSearchModalTableProps<TModel> = {
  columns: ColumnDef<TModel, any>[];
  tableData: TModel[];
  onClickRow: (rowData: TModel) => void;
};

function _SearchModalTable<TModel>(props: TSearchModalTableProps<TModel>) {
  const {
    columns,
    tableData,
    onClickRow,
  } = props;

  //
  // ref
  //
  const $tableRef = useRef<HTMLTableElement | null>(null);

  //
  // hook
  //
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table
      ref={$tableRef}
      className="SearchModalTable">
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            className="headerRow">
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className={header.column.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {tableData.length
          ? table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="row"
              data-state={row.getIsSelected() && 'selected'}
              onClick={() => onClickRow(row.original)}>
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className={cell.column.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          )): (
            // <TableRow className="row">
            <TableRow>
              <TableBlankMessageCell colSpan={columns.length}>
                조회한 데이터가 없습니다.
              </TableBlankMessageCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}

const SearchModalTable = memo(_SearchModalTable) as typeof _SearchModalTable;
export default SearchModalTable;
