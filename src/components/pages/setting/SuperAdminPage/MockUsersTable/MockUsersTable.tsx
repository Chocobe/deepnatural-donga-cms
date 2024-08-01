// react
import {
  memo,
  useState,
} from 'react';
// ui
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

// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  selected: boolean;
}

const columnHelper = createColumnHelper<Person>();

// Make some columns!
const exColumns = [
  // Display Column
  columnHelper.accessor('selected', {
    id: 'actions',
    header: 'ACTIONS',
    cell: props => (
      <input
        type="checkbox"
        checked={props.row.getIsSelected()}
        onChange={() => {
          console.group('onChange()');
          console.log('props.row.getValue(): ', props.row.getValue('firstName'));
          console.log(props.row.original);
          console.groupEnd();
        }} />
    ),
  }),

  // Grouping Column
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: props => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      }),
    ],
  }),
  // Grouping Column
  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: props => props.column.id,
      }),
      // Grouping Column
      columnHelper.group({
        header: 'More Info',
        columns: [
          // Accessor Column
          columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          // Accessor Column
          columnHelper.accessor('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          // Accessor Column
          columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

function _MockUsersTable() {
  const [exData, _setExData] = useState<Person[]>([
    {
      firstName: '이름 1-1',
      lastName: '이름 1-2',
      age: 1,
      visits: 2,
      status: 'Active',
      progress: 3,
      selected: false,
    },
    {
      firstName: '이름 2-1',
      lastName: '이름 2-2',
      age: 11,
      visits: 22,
      status: 'Deactive',
      progress: 33,
      selected: false,
    },
    {
      firstName: '이름 3-1',
      lastName: '이름 3-2',
      age: 111,
      visits: 222,
      status: 'Active',
      progress: 333,
      selected: false,
    },
    {
      firstName: '이름 4-1',
      lastName: '이름 4-2',
      age: 1111,
      visits: 2222,
      status: 'Active',
      progress: 3333,
      selected: false,
    },
    {
      firstName: '이름 5-1',
      lastName: '이름 5-2',
      age: 11111,
      visits: 22222,
      status: 'Deactive',
      progress: 33333,
      selected: false,
    },
  ]);

  const table = useReactTable({
    data: exData,
    columns: exColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={exData.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const MockUserTable = memo(_MockUsersTable);
export default MockUserTable;
