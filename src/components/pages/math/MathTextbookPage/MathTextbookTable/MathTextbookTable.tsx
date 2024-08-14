// react
import { 
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
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
  extractID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// style
import './MathTextbookTable.css';
import routePathFactory from '@/routes/routePathFactory';

const columnHelper = createColumnHelper<TMathTextbookModel>();

type TMathTextbookTableProps = {
  data: TMathTextbookModel[];
};

function MathTextbookTable(props: TMathTextbookTableProps) {
  const {
    data,
  } = props;

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedData, setSelectedData] = useState<TMathTextbookModel[]>([]);

  //
  // cache
  //
  const columns = useMemo(() => [
    columnHelper.display({
      id: 'selector',
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('subject', {
      header: '과목',
    }),
    columnHelper.accessor('curriculum', {
      header: '교육과정',
    }),
    columnHelper.accessor('name', {
      header: '교과서명',
    }),
    columnHelper.accessor('author', {
      header: '저자',
    }),
    columnHelper.accessor('classType', {
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
    data,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: e => {
      setRowSelection(e);

      setTimeout(() => {
        const selectedData = table.getSelectedRowModel().rows.map(row => row.original);
        setSelectedData(selectedData);
      });
    },
  });

  const navigate = useNavigate();

  //
  // callback
  //
  const goToDetailPage = useCallback((textbookId: string) => {
    navigate(routePathFactory
      .math
      .getTextbookDetailPath(textbookId)
    );
  }, [navigate]);

  //
  // effect
  //
  useEffect(() => {
    console.log('selectedData: ', selectedData);
  }, [selectedData]);

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
                className={extractID(header.id) ?? ''}
              >
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
            onClick={() => goToDetailPage(row.original.id)}>
            {row.getVisibleCells().map(cell => (
              <TableCell 
                key={cell.id}
                className={extractID(cell.id) ?? ''}>
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
