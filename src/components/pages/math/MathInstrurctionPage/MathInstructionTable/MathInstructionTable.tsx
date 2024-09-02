// react
import {
  useRef,
  useState,
  useMemo,
  memo,
} from 'react';
// store
import useMathInstructionPageStore from '@/store/mathStores/mathInstructionPageStore/mathInstructionPageStore';
// hook
import useTableWrapperInitScrollEffect from '@/components/hooks/useTableWrapperInitScrollEffect';
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
import TableEllipsisCell from '@/components/shadcn-ui-custom/TableEllipsisCell/TableEllipsisCell';
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

const columnHelper = createColumnHelper<TMathInstructionModel>();

function _MathInstructionTable() {
  //
  // mathInstructionPage store
  //
  const mathInstructionsData = useMathInstructionPageStore(state => state.mathInstructionsData);

  const setSelectedMathInstructions = useMathInstructionPageStore(state => state.setSelectedMathInstructions);

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
    return mathInstructionsData?.results ?? [];
  }, [mathInstructionsData]);

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
      cell: props => {
        const content = props.getValue();

        return (
          <TableEllipsisCell>
            {content}
          </TableEllipsisCell>
        );
      },
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

        setSelectedMathInstructions(selectedMathInstructions);
      });
    },
  });

  useTableWrapperInitScrollEffect({
    $tableRef,
    effectDef: tableData,
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
