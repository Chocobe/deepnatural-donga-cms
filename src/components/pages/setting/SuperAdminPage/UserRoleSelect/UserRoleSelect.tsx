// React
import {
  memo,
  useCallback,
} from 'react';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
// ui
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/ui/select';
// type
import { 
  TGroupModel,
} from '@/apis/models/authModel.type';
// style
import './UserRoleSelect.css';

type TuserRoleSelectProps = {
  value: TGroupModel[];
  onChange: (value: TGroupModel[]) => void;
};

function _UserRoleSelect(props: TuserRoleSelectProps) {
  const {
    value,
    onChange,
  } = props;

  //
  // authApi store
  //
  const groupsState = useAuthApiStore(state => state.groups.state.data);

  //
  // callback
  //
  const onValueChange = useCallback((value: string) => {
    const newValue = groupsState?.find(group => String(group.id) === value);

    if (newValue) {
      onChange([newValue]);
    }
  }, [groupsState, onChange]);

  return (
    <Select
      value={String(value?.[0]?.id)}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="UserRoleSelect-trigger">
        <SelectValue placeholder="권한을 선택해 주세요." />
      </SelectTrigger>

      <SelectContent>
        {groupsState?.map(group => (
          <SelectItem
            key={group.id}
            className="UserRoleSelect-item"
            value={String(group.id)}>
            {group.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const UserRoleSelect = memo(_UserRoleSelect);
export default UserRoleSelect;
