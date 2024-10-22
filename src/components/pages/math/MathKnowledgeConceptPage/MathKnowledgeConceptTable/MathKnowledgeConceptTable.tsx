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
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
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
  flatMathKnowledgeConceptModel,
} from '@/utils/flatModels/flatMathModels';
import { 
  extractID,
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathKnowledgeConceptFlattenModel,
} from '@/apis/models/mathModel.type';
// style
import './MathKnowledgeConceptTable.css';

const columnHelper = createColumnHelper<TMathKnowledgeConceptFlattenModel>();

function _MathKnowledgeConceptTable() {
  //
  // mathKnowledgeConceptPage store
  //
  const mathKnowledgeConceptsData = useMathKnowledgeConceptPageStore(state => state.mathKnowledgeConceptsData);

  const setSelectedMathKnowledgeConcepts = useMathKnowledgeConceptPageStore(state => state.setSelectedMathKnowledgeConcepts);
  const clearSelectedMathKnowledgeConcepts = useMathKnowledgeConceptPageStore(state => state.clearSelectedMathKnowledgeConcepts);

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
    return mathKnowledgeConceptsData?.results.reduce((result, achievement1) => [
      ...result,
      ...flatMathKnowledgeConceptModel(achievement1),
    ], [] as any[]) ?? [];
  }, [mathKnowledgeConceptsData]);

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
        const curriculum = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .curriculum;

        return curriculum;
      },
    }),
    columnHelper.display({
      id: 'classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .classtype;

        return classtype;
      },
    }),
    columnHelper.display({
      id: 'grade_cluster',
      header: '학년(군)',
      cell: props => {
        const gradeCluster = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .grade_cluster;

        return gradeCluster;
      },
    }),
    columnHelper.display({
      id: 'achievement1_title',
      header: '성취기준(대)',
      cell: props => {
        const achievement1Title = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .title;

        return achievement1Title;
      },
    }),
    columnHelper.display({
      id: 'achievement2_title',
      header: '성취기준(중)',
      cell: props => {
        const achievement2Title = props.row.original
          .kc1
          .achievement3
          .achievement2
          .title;

        return achievement2Title;
      },
    }),
    columnHelper.display({
      id: 'achievement3Title',
      header: '성취기준명',
      cell: props => {
        const achievement3Title = props.row.original
          .kc1
          .achievement3
          .title;

        return achievement3Title;
      },
    }),
    columnHelper.accessor('kc1.title', {
      id: '1_kcTitle',
      header: 'KC1',
    }),
    columnHelper.accessor('kc2.title', {
      id: '2_kcTitle',
      header: 'KC2',
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
        const selectedMathKnowledgConcepts = table.getSelectedRowModel().rows.map(row => row.original);

        setSelectedMathKnowledgeConcepts(selectedMathKnowledgConcepts);
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
  const goToDetailPage = useCallback((mathKnowledgeConcept: TMathKnowledgeConceptFlattenModel) => {
    const kc1Id = mathKnowledgeConcept.kc1.id;

    navigate(routePathFactory
      .math
      .getKnowledgeConceptDetailPage(kc1Id)
    );
  }, [navigate]);

  //
  // effect
  //
  useEffect(function _clearSelectedMathKnowledgeConcepts() {
    setRowSelection({});
    clearSelectedMathKnowledgeConcepts();

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table
      ref={$tableRef}
      className="MathKnowledgeConceptTable">
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

const MathKnowledgeConceptTable = memo(_MathKnowledgeConceptTable);
export default MathKnowledgeConceptTable;
