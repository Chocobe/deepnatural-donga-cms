import useMockStore from '@/store/mockStore/mockStore';
import { Switch } from '@/components/shadcn-ui/ui/switch';
import { Label } from '@/components/shadcn-ui/ui/label';

function MockSuperAdminSwitch() {
  const isSuperAdmin = useMockStore(state => state.isSuperAdmin);
  const toggleIsSuperAdmin = useMockStore(state => state.toggleIsSuperAdmin);

  return (
    <div className="mr-5 py-1 px-2 w-[200px] flex items-center space-x-2 text-gray-300 border-2 border-gray-300 rounded-md">
      <Switch 
        id="mock-super-admin-switch-id"
        checked={isSuperAdmin}
        onCheckedChange={toggleIsSuperAdmin} />

      <Label htmlFor="mock-super-admin-switch-id">
        {isSuperAdmin ? 'SuperAdmin' : 'CommonUser' }
      </Label>
    </div>
  );
}

export default MockSuperAdminSwitch;
