// React
import {
  useMemo,
  useCallback,
  memo,
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
import { 
  BLANK_ROLE_GROUP,
} from './UserRoleSelect.type';
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
  const groups = useAuthApiStore(state => state.groups.state.data);

  //
  // callback
  //
  const groupOptions = useMemo<TGroupModel[]>(() => [
    BLANK_ROLE_GROUP,
    ...groups ?? [],
  ], [groups]);

  //
  // callback
  //
  const onValueChange = useCallback((value: string) => {
    const targetGroup = groups?.find(group => {
      return String(group.id) === value 
        && group.id !== BLANK_ROLE_GROUP.id;
    });

    const newValue = targetGroup
      ? [targetGroup]
      : [];

    onChange(newValue);
  }, [groups, onChange]);

  return (
    <Select
      value={String(value?.[0]?.id ?? BLANK_ROLE_GROUP.id)}
      onValueChange={onValueChange}>
      <SelectTrigger className="UserRoleSelect-trigger">
        <SelectValue placeholder="권한을 선택해 주세요." />
      </SelectTrigger>

      <SelectContent>
        {groupOptions?.map(option => (
          <SelectItem
            key={option.id}
            className="UserRoleSelect-item"
            value={String(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const UserRoleSelect = memo(_UserRoleSelect);
export default UserRoleSelect;
