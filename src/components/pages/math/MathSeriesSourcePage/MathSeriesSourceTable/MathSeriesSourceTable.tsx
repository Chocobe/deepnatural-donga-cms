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
import dayjs from 'dayjs';
// type
import { 
  TMathSeriesFlattenModel,
  TMathSeriesModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/components/pages/cmsPages.type';
// style
import './MathSeriesSourceTable.css';

// FIXME: mockup
import mockMathSeriesSources from './mock.MathSeriesSourceTable';

const columnHelper = createColumnHelper<TMathSeriesFlattenModel>();

function flatMathSeriesModel(series: TMathSeriesModel) {
  return series.source_set.map(source => {
    const flattenSeries = {
      series,
      source,
    } as TMathSeriesFlattenModel;

    return flattenSeries;
  });
}

function _MathSeriesSourceTable() {
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
    return mockMathSeriesSources.results.reduce((result, series) => [
      ...result,
      ...flatMathSeriesModel(series),
    ], [] as TMathSeriesFlattenModel[]);
  }, []);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('series.title', {
      header: '시리즈 제목',
    }),
    columnHelper.accessor('source.name', {
      header: '제품명',
    }),
    columnHelper.accessor('source.curriculum', {
      header: '교육\n과정',
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

        if (!classtype || !grade) {
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
    columnHelper.accessor('source.publisher', {
      header: '발행처',
    }),
    columnHelper.accessor('source.expiration_date', {
      header: '사용기간',
      cell: props => {
        const expiration_date = props.cell.getValue();

        return dayjs(expiration_date).format('YY년 MM일 DD일');
      },
    }),
    columnHelper.accessor('source.source_type', {
      header: '사용범위',
    }),
    columnHelper.accessor('source.isview', {
      header: '사용여부',
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
        const selectedMathSeries = table.getSelectedRowModel().rows.map(row => row.original);

        console.log('selectedMathSeries: ', selectedMathSeries);
      });
    },
  });

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
            onClick={() => console.log('상세 페이지 이동')}>
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
