// react
import { 
  useMemo,
} from 'react';

// FIXME: mockup
import { 
  TMockDataTablePayment,
} from '@/components/shadcn-ui/mockUI/MockDataTable/mockDataTable.type';
import { 
  mockDataTableColumns,
} from '@/components/shadcn-ui/mockUI/MockDataTable/mockDataTableColumns';
import MockDataTable from '@/components/shadcn-ui/mockUI/MockDataTable/MockDataTable';

function SuperAdminPageComponent() {
  const data = useMemo<TMockDataTablePayment[]>(() => [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ], []);

  return (
    <div className="container mx-auto py-10">
      <MockDataTable
        columns={mockDataTableColumns}
        data={data} />
    </div>
  );
}

export default SuperAdminPageComponent;
