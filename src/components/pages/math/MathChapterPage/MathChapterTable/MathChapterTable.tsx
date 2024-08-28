// react
import {
  useState,
  useMemo,
  memo,
  useEffect,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathChapterPageStore/mathChapterPageStore';
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
  extractID, 
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathChapter1Model,
  TMathChapterFlattenModel,
} from '@/apis/models/mathModel.type';
// style
import './MathChapterTable.css';

const columnHelper = createColumnHelper<TMathChapterFlattenModel>();

function flatMathChapterModel(chapter1: TMathChapter1Model) {
  return chapter1.chapter2_set.reduce((result, chapter2) => {
    const flattenChapter = {
      chapter1,
      chapter2,
    } as TMathChapterFlattenModel;

    if (!chapter2.chapter3_set?.length) {
      return [
        ...result,
        flattenChapter,
      ];
    }

    return [
      ...result,
      ...chapter2.chapter3_set.map(chapter3 => ({
        ...flattenChapter,
        chapter3,
      } as TMathChapterFlattenModel)),
    ];
  }, [] as TMathChapterFlattenModel[]);
}

function _MathChapterTable() {
  //
  // mathChapterPage store
  //
  const mathChaptersData = useMathChapterPageStore(state => state.mathChaptersData);

  const setSelectedMathChapters = useMathChapterPageStore(state => state.setSelectedMathChapters);
  const clearSelectedMathChapters = useMathChapterPageStore(state => state.clearSelectedMathChapters);

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
    columnHelper.accessor('chapter1.textbook_title', {
      id: 'textbook',
      header: '교과서',
    }),
    columnHelper.accessor('chapter1.no', {
      header: '대단원\n번호',
    }),
    columnHelper.accessor('chapter1.title', {
      header: '대단원 제목',
    }),
    columnHelper.accessor('chapter2.no', {
      header: '중단원\n번호',
    }),
    columnHelper.accessor('chapter2.title', {
      header: '중단원 제목',
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
      header: '소단원 제목',
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

  //
  // effect
  //
  useEffect(function _clearSelectedMathChapters() {
    setRowSelection({});
    clearSelectedMathChapters();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table className="MathChapterTable">
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

const MathChapterTable = memo(_MathChapterTable);
export default MathChapterTable;
