// react
import { 
  useRef,
  useState,
  useMemo,
  useEffect,
  memo,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathAchievementPageStore/mathAchievementPageStore';
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
// util
import { 
  extractID,
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathAchievement1Model, 
  TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';
// style
import './MathAchievementTable.css';

const columnHelper = createColumnHelper<TMathAchievementFlattenModel>();

function flatMathAchievementModel(achievement1: TMathAchievement1Model) {
  return achievement1.achievement2_set.reduce((result, achievement2) => {
    const flattenAchievement = {
      achievement1,
      achievement2,
    } as TMathAchievementFlattenModel;

    if (!achievement2.achievement3_set?.length) {
      return [
        ...result,
        flattenAchievement,
      ];
    }

    return [
      ...result,
      ...achievement2.achievement3_set.map(achievement3 => ({
        ...flattenAchievement,
        achievement3,
      } as TMathAchievementFlattenModel)),
    ];
  }, [] as TMathAchievementFlattenModel[]);
}

function _MathAchievementTable() {
  //
  // mathAchievementPage store
  //
  const mathAchievementsData = useMathAchievementPageStore(state => state.mathAchievementsData);

  const clearSelectedMathAchievements = useMathAchievementPageStore(state => state.clearSelectedMathAchievements);
  const setSelectedMathAchievements = useMathAchievementPageStore(state => state.setSelectedMathAchievements);

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
    return mathAchievementsData?.results.reduce((result, achievement1) => [
      ...result,
      ...flatMathAchievementModel(achievement1),
    ], [] as TMathAchievementFlattenModel[]) ?? [];
  }, [mathAchievementsData]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    columnHelper.accessor('achievement1.no', {
      header: '성취기준\n(대)순번',
    }),
    columnHelper.accessor('achievement1.title', {
      header: '성취기준(대) 제목',
    }),
    columnHelper.accessor('achievement2.no', {
      header: '성취기준\n(중)순번',
    }),
    columnHelper.accessor('achievement2.title', {
      header: '성취기준(중) 제목',
    }),
    columnHelper.accessor('achievement3.no', {
      header: '성취기준\n(소)순번',
    }),
    columnHelper.accessor('achievement3.title', {
      header: '성취기준(소) 제목',
    }),
    columnHelper.display({
      id: 'code',
      header: '표준코드',
      cell: props => {
        const achievement3 = props.row.original.achievement3;

        return achievement3?.code ?? '';
      },
    }),
    columnHelper.accessor('achievement1.curriculum', {
      header: '교육과정',
    }),
    columnHelper.accessor('achievement1.classtype', {
      header: '학교급',
    }),
    columnHelper.accessor('achievement1.grade_cluster', {
      header: '학년(군)',
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
        const selectedMathAchievements = table.getSelectedRowModel().rows.map(row => row.original);
        setSelectedMathAchievements(selectedMathAchievements);
      });
    },
  });

  useTableWrapperInitScrollEffect({
    $tableRef,
    effectDef: tableData,
  });

  //
  // effect
  //
  useEffect(function _clearSelectedMathAchievements() {
    setRowSelection({});
    clearSelectedMathAchievements();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table
      ref={$tableRef}
      className="MathAchievementTable">
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

const MathAchievementTable = memo(_MathAchievementTable);
export default MathAchievementTable;
