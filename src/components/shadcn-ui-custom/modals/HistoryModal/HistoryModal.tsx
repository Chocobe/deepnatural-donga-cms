// react
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
// store
import useHistoryModalStore from '@/store/historyModalStore/historyModalStore';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
import TableBlankMessageCell from '../../TableBlankMessageCell/TableBlankMessageCell';
// util
import { 
  extractID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
// dayjs
import dayjs from 'dayjs';
// type
import { 
  THistoryModalData,
} from './HistoryModal.type';
// style
import './HistoryModal.css';

const columnHelper = createColumnHelper<THistoryModalData>();

function HistoryModal() {
  //
  // historyModal store
  //
  const historyModalStoreState = useHistoryModalStore(state => state);
  const {
    isOpen,
    historyDataList,
    closeHistoryModal,
  } = historyModalStoreState;

  //
  // ref
  //
  const isOpenRef = useRef(isOpen);

  //
  // state
  //
  const [historiesForDisplay, setHistoriesForDisplay] = useState<THistoryModalData[]>([]);

  //
  // cache
  //
  const columns = useMemo(() => [
    columnHelper.accessor('createdAt', {
      header: '날짜/시간',
      cell: ({ cell }) => {
        return dayjs(cell.getValue()).format('YYYY년 M월 D일 h:m A');
      },
    }),
    columnHelper.accessor('username', {
      header: '사용자',
    }),
    columnHelper.accessor('action', {
      header: '액션',
    }),
  ], []);

  //
  // hook
  //
  const table = useReactTable({
    columns,
    data: historiesForDisplay,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: false,
  });

  //
  // callback
  //
  const onAnimationEnd = useCallback(() => {
    if (isOpen) {
      return;
    }

    setHistoriesForDisplay([]);
  }, [isOpen]);

  //
  // effect
  //
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (historyDataList && isOpenRef.current) {
      setHistoriesForDisplay(historyDataList);
    }
  }, [historyDataList]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeHistoryModal}>
      <DialogTrigger hidden />

      <DialogContent 
        className="HistoryModal"
        onAnimationEndCapture={onAnimationEnd}>
        <DialogHeader className="HistoryModal-header">
          <DialogTitle className="title"> 
            히스토리
          </DialogTitle>

          <DialogDescription hidden />
        </DialogHeader>

        <div className="HistoryModal-main">
          <Table className="table">
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow
                  key={headerGroup.id}
                  className="headerRow">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={extractID(header.id) ?? ''}>
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
              {historiesForDisplay?.length
                ? table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className="row">
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
                )): (
                  <TableRow>
                    <TableBlankMessageCell colSpan={3}>
                      히스토리가 없습니다.
                    </TableBlankMessageCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="HistoryModal-footer">
          <Button
            className="button"
            onClick={closeHistoryModal}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default HistoryModal;
