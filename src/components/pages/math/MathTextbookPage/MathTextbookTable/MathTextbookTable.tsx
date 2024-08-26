// react
import { 
  useState,
  useMemo,
  useCallback,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// ui
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  RowSelectionState,
} from '@tanstack/react-table';
import TableRowSelectorHeader from '@/components/shadcn-ui-custom/TableRowSelectorHeader/TableRowSelectorHeader';
import TableRowSelectorCell from '@/components/shadcn-ui-custom/TableRowSelectorCell/TableRowSelectorCell';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
// type
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
// util
import { 
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// style
import './MathTextbookTable.css';

const columnHelper = createColumnHelper<TMathTextbookModel>();

function MathTextbookTable() {
  //
  // mathTextbookPage store
  //
  const mathTextbooksData = useMathTextbookPageStore(state => state.mathTextbooksData);
  const tableData = mathTextbooksData?.results ?? [];

  const setDetailTargetMathTextbook = useMathTextbookPageStore(state => state.setDetailTargetMathTextbook);
  const setSelectedMathTextbooks = useMathTextbookPageStore(state => state.setSelectedMathTextbooks);

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  //
  // cache
  //
  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('curriculum', {
      header: '교육과정',
    }),
    columnHelper.accessor('title', {
      header: '교과서명',
    }),
    columnHelper.accessor('author', {
      header: '저자',
    }),
    columnHelper.accessor('classtype', {
      header: '학교급',
    }),
    columnHelper.accessor('grade', {
      header: '학년',
    }),
    columnHelper.accessor('term', {
      header: '학기',
    }),
  ], []);

  //
  // hook
  //
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: e => {
      setRowSelection(e);

      setTimeout(() => {
        const selectedMathTextbooks = table.getSelectedRowModel().rows.map(row => row.original);
        setSelectedMathTextbooks(selectedMathTextbooks);
      });
    },
  });

  const navigate = useNavigate();

  //
  // callback
  //
  const goToDetailPage = useCallback((mathTextbook: TMathTextbookModel) => {
    const textbookId = mathTextbook.id;

    setDetailTargetMathTextbook(mathTextbook);

    navigate(routePathFactory
      .math
      .getTextbookDetailPath(textbookId)
    );
  }, [setDetailTargetMathTextbook, navigate]);

  return (
    <Table className="MathTextbookTable">
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
            onClick={() => goToDetailPage(row.original)}>
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

export default MathTextbookTable;
