// react
import { 
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
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
import { 
  cmsCommonModelClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/components/pages/cmsPages.type';
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

  const setSelectedMathTextbooks = useMathTextbookPageStore(state => state.setSelectedMathTextbooks);
  const clearSelectedMathTextbooks = useMathTextbookPageStore(state => state.clearSelectedMathTextbooks);

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
    return mathTextbooksData?.results ?? [];
  }, [mathTextbooksData]);

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
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsClassTypeOptions.find(({ value }) => value === cell.getValue());
        return valueItem?.text ?? ' ';
      },
    }),
    columnHelper.accessor('grade', {
      header: '학년',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsGradeOptions[
          cmsCommonModelClassTypeMapper.ELEMENTARY
        ].find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
    }),
    columnHelper.accessor('term', {
      header: '학기',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsTermOptions
          .find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
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

  useTableWrapperInitScrollEffect({
    $tableRef,
    effectDef: tableData,
  });

  const navigate = useNavigate();

  //
  // callback
  //
  const goToDetailPage = useCallback((mathTextbook: TMathTextbookModel) => {
    const textbookId = mathTextbook.id;

    navigate(routePathFactory
      .math
      .getTextbookDetailPath(textbookId)
    );
  }, [navigate]);

  //
  // effect
  //
  useEffect(function _clearSelectedMathTextbooks() {
    setRowSelection({});
    clearSelectedMathTextbooks();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table 
      ref={$tableRef}
      className="MathTextbookTable">
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
