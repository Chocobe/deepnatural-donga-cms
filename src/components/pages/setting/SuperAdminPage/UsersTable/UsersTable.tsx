// react
import {
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
import useSuperAdminPageStore from '@/store/superAdminPageStore/superAdminPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  addOriginItemIndexToTableData,
  TABLE_ROW_SELECTION_CHECKBOX_ID,
  TListItemWithOriginItemIndex,
} from '@/lib/tanstack-reactTable-utils/tanstack-reactTable-utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn-ui/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  createColumnHelper,
  RowSelectionState,
  RowData,
  ColumnFiltersState,
} from '@tanstack/react-table';
import UserRoleSelect from '../UserRoleSelect/UserRoleSelect';
import UserStatusToggleButton from '../UserStatusToggleButton/UserStatusToggleButton';
import TableRowSelectorHeader from '@/components/shadcn-ui-custom/TableRowSelectorHeader/TableRowSelectorHeader';
import TableRowSelectorCell from '@/components/shadcn-ui-custom/TableRowSelectorCell/TableRowSelectorCell';
import TableBlankMessageCell from '@/components/shadcn-ui-custom/TableBlankMessageCell/TableBlankMessageCell';
// type
import { 
  TGroupModel,
  TUserModel,
} from '@/apis/models/authModel.type';
import { 
  TPatchUserApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './UsersTable.css';

declare module '@tanstack/react-table' {
  export interface TableMeta<TData extends RowData> {
    updateIsActive: (
      value: boolean,
      rowData: TListItemWithOriginItemIndex<TData>,
    ) => void;

    updateGroups: (
      value: TGroupModel[],
      rowData: TData
    ) => void;
  }
}

const columnHelper = createColumnHelper<TListItemWithOriginItemIndex<TUserModel>>();

function _UsersTable() {
  //
  // superAdminPage store
  //
  const usersData = useSuperAdminPageStore(state => state.usersData);
  const searchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.searchParamsForRetrieveUsersApi);
  const {
    is_active,
  } = searchParamsForRetrieveUsersApi;

  const updateUsersData = useSuperAdminPageStore(state => state.updateUsersData);
  const updateUsersCount = useSuperAdminPageStore(state => state.updateUsersCount);

  const setDetailTargetUser = useSuperAdminPageStore(state => state.setDetailTargetUser);

  const setSelectedUsers = useSuperAdminPageStore(state => state.setSelectedUsers);

  //
  // state
  //
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>();
  const [tableData, setTableData] = useState(() => {
    return addOriginItemIndexToTableData(usersData?.results ?? []);
  });

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // cache
  //
  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: TABLE_ROW_SELECTION_CHECKBOX_ID,
        header: TableRowSelectorHeader,
        cell: TableRowSelectorCell,
      }),

      columnHelper.accessor('username', {
        header: '아이디'
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
            table,
            row,
            cell,
          } = props;

          return (
            <UserRoleSelect
              value={cell.getValue()}
              onChange={value => {
                table.options.meta?.updateGroups(value, row.original);
              }} />
          );
        },
      }),

      columnHelper.accessor('is_active', {
        header: '상태',
        cell: props => {
          const {
            table,
            row,
            cell,
          } = props;

          return (
            <UserStatusToggleButton
              value={cell.getValue()}
              onChange={value => {
                table.options.meta?.updateIsActive(value, row.original);
              }} />
          );
        },
      }),
    ];
  }, []);

  //
  // callback
  //
  const updateUser = useCallback(<T,>(params: {
    columnID: string;
    value: T
    rowData: TListItemWithOriginItemIndex<TUserModel>;
  }) => {
    const {
      columnID,
      value,
      rowData,
    } = params;

    const {
      originItemIndex,
    } = rowData;

    updateUsersData(old => {
      return {
        ...old,
        results: old?.results.map((row, index) => {
          return index !== originItemIndex
            ? row
            : {
              ...row,
              [columnID]: value,
            };
        }) ?? [],
      };
    });
  }, [updateUsersData]);

  const goToUserInfoEditPage = useCallback((user: TUserModel) => {
    setDetailTargetUser(user);

    navigate(routePathFactory
      .setting
      .getUserInfoEditPage(user.id)
    );
  }, [setDetailTargetUser, navigate]);

  //
  // hook
  //
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    enableColumnFilters: true,
    state: {
      rowSelection,
      columnFilters: columnFilters,
    },
    onRowSelectionChange: e => {
      setRowSelection(e);

      setTimeout(() => {
        const selectedUsers = table.getSelectedRowModel().rows.map(row => row.original);
        setSelectedUsers(selectedUsers);
      });
    },

    meta: {
      updateIsActive: async (value, rowData) => {
        const params: TPatchUserApiRequestParams = {
          pathParams: {
            userId: rowData.id,
          },
          payload: {
            is_active: value,
          },
        };

        const response = await ApiManager
          .auth
          .patchUserApi
          .callWithNoticeMessageGroup(params, {
            successMessage: {
              isDisabled: true,
            },
          });

        if (!response?.data) {
          return;
        }

        updateUser({
          columnID: 'is_active',
          value,
          rowData,
        });

        updateUsersCount(usersCount => {
          if (!usersCount) {
            return usersCount;
          }

          const newUsersCount = usersCount;

          switch (value) {
            case true: {
              newUsersCount.active_user_count++;
              newUsersCount.inactive_user_count--;
              break;
            }

            case false: {
              newUsersCount.active_user_count--;
              newUsersCount.inactive_user_count++;
              break;
            }
          }

          return newUsersCount;
        });
      },

      updateGroups: async (value, rowData) => {
        const params: TPatchUserApiRequestParams = {
          pathParams: {
            userId: rowData.id,
          },
          payload: {
            groups: value?.[0]
              ? [value[0].id]
              : [],
          },
        };

        const response = await ApiManager
          .auth
          .patchUserApi
          .callWithNoticeMessageGroup(params, {
            successMessage: {
              isDisabled: true,
            },
          });

        if (!response?.data) {
          return;
        }

        updateUser({
          columnID: 'groups',
          value,
          rowData
        });
      },
    },
  });

  //
  // effect
  //
  useEffect(function onChangeUsersData() {
    setTableData(addOriginItemIndexToTableData(usersData?.results ?? []));
  }, [usersData?.results]);

  useEffect(function onChangeIsActive() {
    if (typeof is_active === 'undefined') {
      setColumnFilters([]);
    } else {
      setColumnFilters([
        {
          id: 'is_active',
          value: is_active,
        },
      ]);
    }
  }, [is_active]);

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
                className={header.column.id ?? ''}>
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
        {tableData?.length
          ? table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="row"
              data-state={row.getIsSelected() && 'selected'}
              onClick={() => goToUserInfoEditPage(row.original)}>
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
          )): (
            <TableRow>
              <TableBlankMessageCell colSpan={6}>
                등록된 사용자가 없습니다.
              </TableBlankMessageCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}

const UserTable = memo(_UsersTable);
export default UserTable;
