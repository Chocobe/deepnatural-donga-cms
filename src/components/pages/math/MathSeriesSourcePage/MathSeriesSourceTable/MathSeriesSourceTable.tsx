// react
import { 
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
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
// util
import { 
  extractID,
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// dayjs
// FIXME: 미사용 처리
// import dayjs from 'dayjs';
// type
import { 
  TMathSeriesSourceFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
// util
import { 
  flatMathSeriesModel,
} from '@/utils/flatModels/flatMathModels';
// style
import './MathSeriesSourceTable.css';

const columnHelper = createColumnHelper<TMathSeriesSourceFlattenModel>();

function _MathSeriesSourceTable() {
  //
  // mathSeiresSourcePage store
  //
  const mathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.mathSeriesSourcesData);

  const setSelectedMathSeriesSources = useMathSeriesSourcePageStore(state => state.setSelectedMathSeriesSources);
  const clearSelectedMathSeriesSources = useMathSeriesSourcePageStore(state => state.clearSelectedMathSeriesSources);

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
    return mathSeriesSourcesData?.results.reduce((result, series) => [
      ...result,
      ...flatMathSeriesModel(series),
    ], [] as TMathSeriesSourceFlattenModel[]) ?? [];
  }, [mathSeriesSourcesData]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('source.curriculum', {
      header: '교육과정',
    }),
    columnHelper.accessor('source.classtype', {
      header: '학교급',
      cell: props => {
        const classtype = props.cell.getValue();

        return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
          ?? '';
      },
    }),
    columnHelper.accessor('source.grade', {
      header: '학년',
      cell: props => {
        const classtype = props.row.original.source.classtype;
        const grade = props.cell.getValue();

        if (!classtype) {
          return '';
        }

        return cmsGradeOptions[classtype].find(({ value }) => Number(value) === grade)?.text
          ?? '';
      },
    }),
    columnHelper.accessor('source.term', {
      header: '학기',
      cell: props => {
        const term = props.cell.getValue();

        return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
          ?? '';
      }
    }),
    columnHelper.accessor('source.serviceyear', {
      header: '판형',
    }),
    columnHelper.accessor('series.title', {
      header: '시리즈',
    }),
    columnHelper.accessor('source.name', {
      header: '제품명',
    }),
    columnHelper.accessor('source.source_type', {
      header: '제품 분류',
    }),
    // FIXME: 미사용 처리
    // columnHelper.accessor('source.publisher', {
    //   header: '발행처',
    // }),
    // columnHelper.accessor('source.expiration_date', {
    //   header: '사용기간',
    //   cell: props => {
    //     const expiration_date = props.cell.getValue();

    //     return dayjs(expiration_date).format('YY년 MM일 DD일');
    //   },
    // }),
    // columnHelper.accessor('source.isview', {
    //   header: '사용여부',
    // }),
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
        const selectedMathSeriesSources = table.getSelectedRowModel().rows.map(row => row.original);

        setSelectedMathSeriesSources(selectedMathSeriesSources);
      });
    },
  });

  const navigate = useNavigate();

  //
  // callback
  //
  const goToDetailPage = useCallback((mathSeries: TMathSeriesSourceFlattenModel) => {
    const seriesId = mathSeries.series.id;

    navigate(routePathFactory
      .math
      .getSeriesSourceDetailPage(seriesId)
    );
  }, [navigate]);

  //
  // effect
  //
  useEffect(function _cleanup() {
    setRowSelection({});
    clearSelectedMathSeriesSources();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table
      ref={$tableRef}
      className="MathSeriesSourceTable">
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            className="headerRow">
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className={extractID(header.column.id) ?? ''}>
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
                className={extractID(cell.column.id) ?? ''}
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

const MathSeriesSourceTable = memo(_MathSeriesSourceTable);
export default MathSeriesSourceTable;
