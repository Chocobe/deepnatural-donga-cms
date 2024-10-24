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
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useTableWrapperInitScrollEffect from '@/components/hooks/useTableWrapperInitScrollEffect';
// ui
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  RowSelectionState,
  CellContext,
} from '@tanstack/react-table';
import TableRowSelectorHeader from '@/components/shadcn-ui-custom/TableRowSelectorHeader/TableRowSelectorHeader';
import TableRowSelectorCell from '@/components/shadcn-ui-custom/TableRowSelectorCell/TableRowSelectorCell';
import TableEllipsisCell from '@/components/shadcn-ui-custom/TableEllipsisCell/TableEllipsisCell';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuMonitor,
  LuFrown,
  LuSmile,
} from 'react-icons/lu';
// util
import { 
  TABLE_ROW_SELECTION_CHECKBOX_ID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// type
import { 
  TMathQuestionModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsDifficultyTemplate,
  cmsGradeTemplate, 
  cmsTermTemplate,
} from '@/apis/models/cmsCommonModel.type';
// style
import './MathQuestionTable.css';

const columnHelper = createColumnHelper<TMathQuestionModel>();

function _MathQuestionTable() {
  //
  // mathQuestionPage store
  //
  const mathQuestionsData = useMathQuestionPageStore(state => state.mathQuestionsData);

  const setSelectedMathQuestions = useMathQuestionPageStore(state => state.setSelectedMathQuestions);
  const clearSelectedMathQuestions = useMathQuestionPageStore(state => state.clearSelectedMathQuestions);

  const setPreviewMathQuestion = useMathQuestionPageStore(state => state.setPreviewMathQuestion);

  //
  // ref
  //
  const $tableRef = useRef<HTMLTableElement | null>(null);

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const onClickPreview = useCallback((
    tableCellContext: CellContext<TMathQuestionModel, unknown>
  ) => {
    const mathQuestion = tableCellContext.row.original;

    setPreviewMathQuestion(mathQuestion);
  }, [setPreviewMathQuestion]);

  const goToDetailPage = useCallback((mathQuestion: TMathQuestionModel) => {
    const questionId = mathQuestion.id;

    navigate(routePathFactory
      .math
      .getQuestionDetailPage(questionId)
    );
  }, [navigate]);

  //
  // cache
  //
  const tableData = useMemo(() => {
    return mathQuestionsData?.results ?? [];
  }, [mathQuestionsData]);

  const columns = useMemo(() => [
    columnHelper.display({
      id: TABLE_ROW_SELECTION_CHECKBOX_ID,
      header: TableRowSelectorHeader,
      cell: TableRowSelectorCell,
    }),
    // TODO: 렌더링 대상 확인 필요
    columnHelper.accessor('internal_id', {
      header: '문항 ID',
    }),
    columnHelper.accessor('source.curriculum', {
      id: 'curriculum',
      header: '교육과정',
    }),
    columnHelper.accessor('source.classtype', {
      id: 'classtype',
      header: '학교급',
    }),
    columnHelper.accessor('source.grade', {
      id: 'grade',
      header: '학년',
      cell: props => {
        const grade = props.getValue();

        return cmsGradeTemplate[grade] ?? '';
      },
    }),
    columnHelper.accessor('source.term', {
      id: 'term',
      header: '학기',
      cell: props => {
        const term = props.getValue();

        return cmsTermTemplate[term];
      },
    }),
    columnHelper.display({
      id: 'kc1_title',
      header: 'KC1',
      cell: props => {
        const kc1_title = props.row.original.kc2?.kc1?.title ?? '';

        return (
          <TableEllipsisCell maxRows={2}>
            {kc1_title}
          </TableEllipsisCell>
        );
      },
    }),
    columnHelper.display({
      id: 'kc2_title',
      header: 'KC2',
      cell: props => {
        const kc2_title = props.row.original.kc2?.title ?? '';

        return (
          <TableEllipsisCell maxRows={2}>
            {kc2_title}
          </TableEllipsisCell>
        );
      },
    }),
    columnHelper.display({
      id: 'instruction_inquiry',
      header: '지문 / 발문',
      cell: props => {
        const {
          instruction,
          inquiry,
        } = props.row.original;

        const instructionContent = instruction?.content ?? '-';

        return (
          <div className="multiLineCell">
            <TableEllipsisCell maxRows={1}>
              지문 : {instructionContent}
            </TableEllipsisCell>

            <TableEllipsisCell maxRows={1}>
              발문 : {inquiry}
            </TableEllipsisCell>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'preview',
      header: '미리\n보기',
      cell: props => (
        <Button
          className="button"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onClickPreview(props);
          }}>
          <LuMonitor />
        </Button>
      ),
    }),
    columnHelper.accessor('difficulty', {
      header: '난이도',
      cell: props => {
        const difficulty = props.getValue();

        return cmsDifficultyTemplate[difficulty];
      },
    }),
    columnHelper.accessor('question_type', {
      header: '문제유형',
    }),
    columnHelper.accessor('is_reviewed', {
      header: '검수\n여부',
      cell: props => {
        const isReviewed = props.getValue();

        return isReviewed
          ? <LuSmile className="icon isReviewed" />
          : <LuFrown className="icon" />;
      },
    }),
  ], [onClickPreview]);

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
    onRowSelectionChange(rowSelection) {
      setRowSelection(rowSelection);

      setTimeout(() => {
        const selectedMathQuestions = table.getSelectedRowModel().rows.map(row => row.original);

        setSelectedMathQuestions(selectedMathQuestions);
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
  useEffect(() => {
    clearSelectedMathQuestions();
    setRowSelection({});

    // eslint-disable-next-line
  }, [tableData]);

  return (
    <Table
      ref={$tableRef}
      className="MathQuestionTable">
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

const MathQuestionTable = memo(_MathQuestionTable);
export default MathQuestionTable;
