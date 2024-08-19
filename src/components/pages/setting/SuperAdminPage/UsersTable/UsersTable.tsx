// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
// react-table
import { 
  extractID,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
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
import { 
  Checkbox,
  CHECKBOX_INDETERMINATE,
} from '@/components/shadcn-ui/ui/checkbox';
import UserRoleSelect from '../UserRoleSelect/UserRoleSelect';
import UserStatusToggleButton from '../UserStatusToggleButton/UserStatusToggleButton';
// type
import { 
  TUserModel,
} from '@/apis/models/authModel.type';
// style
import './UsersTable.css';

type TUserTableProps = {
  data: TUserModel[];
  setData: Dispatch<SetStateAction<TUserModel[]>>;
};

const columnHelper = createColumnHelper<TUserModel>();

function _UsersTable(props: TUserTableProps) {
  const {
    data,
    setData,
  } = props;

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedData, setSelectedData] = useState<TUserModel[]>([]);

  useEffect(() => {
    console.group('effect');
    console.log('selectedData:', selectedData);
    console.groupEnd();
  }, [selectedData]);

  //
  // cache
  //
  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: 'selector',
        header: props => {
          return (
            <Checkbox
              className="block m-auto"
              checked={
                props.table.getIsAllPageRowsSelected() ||
                (props.table.getIsSomePageRowsSelected() && CHECKBOX_INDETERMINATE)
              }
              onCheckedChange={checked => {
                props.table.getToggleAllRowsSelectedHandler()({
                  target: { checked },
                });
              }}
              aria-label="Select all"
            />
          );
        },
        cell: props => {
          return (
            <Checkbox
              className="block m-auto"
              checked={props.row.getIsSelected()}
              disabled={!props.row.getCanSelect()}
              onCheckedChange={e => {
                console.log('e: ', e);
                props.row.getToggleSelectedHandler()(e);
              }}
            />
          );
        },
      }),

      columnHelper.accessor('username', {
        header: '이름'
      }),

      columnHelper.accessor('email', {
        header: '이메일',
      }),

      columnHelper.accessor('phone', {
        header: '휴대전화',
      }),

      columnHelper.accessor('groups', {
        header: '권한',
        cell: props => {
          const {
            getValue,
            row,
            column,
            table,
          } = props;

          return (
            <UserRoleSelect
              value={getValue()}
              onChange={value => {
                table.options.meta?.updateData(row.index, column.id, value);
              }} />
          );
        },
      }),

      columnHelper.accessor('is_active', {
        header: '상태',
        cell: props => {
          const {
            cell,
            column,
            row,
            table,
          } = props;

          return (
            <UserStatusToggleButton
              value={cell.getValue()}
              onChange={value => {
                table.options.meta?.updateData(row.index, column.id, value);
              }} />
          );
        },
      }),
    ];
  }, []);

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

    meta: {
      updateData: async (rowIndex, columnID, value) => {
        await new Promise<void>(res => {
          setTimeout(() => {
            setData(old => old.map((row, index) => {
              return rowIndex !== index
                ? row
                : {
                  ...row,
                  [columnID]: value,
                };
            }));

            res();
          }, 1_000);
        });
      },
    },
  });

  //
  // callback
  //
  const goToDetailPage = useCallback((user: TUserModel) => {
    console.group('User 상세 페이지 이동');
    console.log('user: ', user);
    console.groupEnd();
  }, []);

  return (
    <Table className="UsersTable">
      <TableHeader className="">
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
            onClick={() => goToDetailPage(row.original)}>
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

const UserTable = memo(_UsersTable);
export default UserTable;
