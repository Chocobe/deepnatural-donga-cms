import { 
  ColumnDef,
} from '@tanstack/react-table';
import { 
  TMockDataTablePayment,
} from './mockDataTable.type';

export const mockDataTableColumns: ColumnDef<TMockDataTablePayment>[] = [
  {
    accessorKey: 'id',
    // header: 'ID',
    header: () => (
      <div className="flex justify-center items-center">
        <input type="checkbox" />
      </div>
    ),
    cell: () => (
      <div className="flex justify-center items-center">
        <input type="checkbox" />
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
