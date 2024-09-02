// react
import {
  useRef,
  useState,
  useMemo,
  memo,
} from 'react';
// ui
import { 
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  RowSelectionState,
} from '@tanstack/react-table';
import { 
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/shadcn-ui/ui/table';
import TableRowSelectorHeader from '@/components/shadcn-ui-custom/TableRowSelectorHeader/TableRowSelectorHeader';
import TableRowSelectorCell from '@/components/shadcn-ui-custom/TableRowSelectorCell/TableRowSelectorCell';
// util
import { 
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathInstructionModel,
} from '@/apis/models/mathModel.type';
// style
import './MathInstructionTable.css';

// FIXME: mockup
import mockMathInstructions from './mock.MathInstructionTable';

const columnHelper = createColumnHelper<TMathInstructionModel>();

function _MathInstructionTable() {
  //
  // ref
  //
  const $tableRef = useRef<HTMLTableElement | null>(null);

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  //
  // cache
  //
  const tableData = useMemo(() => {
    return mockMathInstructions.results;
  }, []);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('representation_question_id', {
      header: '문항 ID',
    }),
    columnHelper.accessor('content', {
      header: '지문 내용',
    }),
    columnHelper.display({
      id: 'source_series',
      header: 'Source Series',
      cell: 'TBU',
    }),
    columnHelper.accessor('source.name', {
      id: 'source_name',
      header: '제품명',
    }),
    columnHelper.accessor('source.source_type', {
      id: 'source_type',
      header: '사용 범위',
    }),
  ], []);

  //
  // hook
  //
  const table = useReactTable({
    columns,
    data: tableData,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: rowSelection => {
      setRowSelection(rowSelection);

      setTimeout(() => {
        const selectedMathInstructions = table.getSelectedRowModel().rows.map(row => row.original);

        console.log('selectedMathInstructions: ', selectedMathInstructions);
      });
    },
  });

  return (
    <Table
      ref={$tableRef}
      className="MathInstructionTable">
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
        {table.getRowModel().rows.map(row => (
          <TableRow
            key={row.id}
            className="row"
            data-state={row.getIsSelected() && 'selected'}
            onClick={() => console.log('상세 페이지 이동')}>
            {row.getVisibleCells().map(cell => (
              <TableCell
                key={cell.id}
                className={cell.column.id}
                onClick={e => {
                  if (cell.column.id === TABLE_ROW_SELECTION_CHECKBOX_ID) {
                    e.stopPropagation();
                  }
                }}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const MathInstructionTable = memo(_MathInstructionTable);
export default MathInstructionTable;
