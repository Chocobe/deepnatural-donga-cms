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
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
import TableRowSelectorHeader from '@/components/shadcn-ui-custom/TableRowSelectorHeader/TableRowSelectorHeader';
import TableRowSelectorCell from '@/components/shadcn-ui-custom/TableRowSelectorCell/TableRowSelectorCell';
// util
import { 
  flatMathChapterModel,
} from '@/utils/flatModels/flatMathModels';
import { 
  extractID, 
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathChapterFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions, 
  cmsGradeOptions, 
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
// style
import './MathChapterTable.css';

const columnHelper = createColumnHelper<TMathChapterFlattenModel>();

function _MathChapterTable() {
  //
  // mathChapterPage store
  //
  const mathChaptersData = useMathChapterPageStore(state => state.mathChaptersData);

  const setSelectedMathChapters = useMathChapterPageStore(state => state.setSelectedMathChapters);
  const clearSelectedMathChapters = useMathChapterPageStore(state => state.clearSelectedMathChapters);

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
    return mathChaptersData?.results.reduce((tableData, chapter1) => [
      ...tableData,
      ...flatMathChapterModel(chapter1),
    ], [] as TMathChapterFlattenModel[]) ?? [];
  }, [mathChaptersData]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.display({
      id: 'curriculum',
      header: '교육과정',
      cell: props => {
        const curriculum = props.row.original.chapter1.textbook_curriculum;

        return curriculum;
      },
    }),
    columnHelper.display({
      id: 'classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.row.original.chapter1.textbook_classtype;

        return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
          ?? '';
      },
    }),
    columnHelper.display({
      id: 'grade',
      header: '학년',
      cell: props => {
        const classtype = props.row.original.chapter1.textbook_classtype;
        const grade = props.row.original.chapter1.textbook_grade;

        if (!classtype) {
          return '';
        }

        return cmsGradeOptions[classtype]?.find(({ value }) => Number(value) === grade)?.text
          ?? '';
      },
    }),
    columnHelper.display({
      id: 'term',
      header: '학기',
      cell: props => {
        const term = props.row.original.chapter1.textbook_term;

        return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
          ?? '';
      },
    }),
    columnHelper.accessor('chapter1.textbook_title', {
      id: 'textbook',
      header: '교과서',
    }),
    columnHelper.accessor('chapter1.no', {
      header: '대단원\n번호',
    }),
    columnHelper.accessor('chapter1.title', {
      header: '대단원명',
    }),
    columnHelper.accessor('chapter2.no', {
      header: '중단원\n번호',
    }),
    columnHelper.accessor('chapter2.title', {
      header: '중단원명',
    }),
    columnHelper.display({
      id: 'no',
      header: '소단원\n번호',
      cell: props => {
        const chapter3 = props.row.original.chapter3;

        return chapter3?.no ?? '';
      },
    }),
    columnHelper.display({
      id: 'title',
      header: '소단원명',
      cell: props => {
        const chapter3 = props.row.original.chapter3;

        return chapter3?.title ?? '';
      }
    })
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
        const selectedMathChapters = table.getSelectedRowModel().rows.map(row => row.original);
        setSelectedMathChapters(selectedMathChapters);
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
  const goToDetailPage = useCallback((mathChapter: TMathChapterFlattenModel) => {
    const chapterId = mathChapter.chapter1.id;

    navigate(routePathFactory
      .math
      .getChapterDetailPath(chapterId)
    );
  }, [navigate]);

  //
  // effect
  //
  useEffect(function _clearSelectedMathChapters() {
    setRowSelection({});
    clearSelectedMathChapters();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table 
      ref={$tableRef}
      className="MathChapterTable">
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

const MathChapterTable = memo(_MathChapterTable);
export default MathChapterTable;
