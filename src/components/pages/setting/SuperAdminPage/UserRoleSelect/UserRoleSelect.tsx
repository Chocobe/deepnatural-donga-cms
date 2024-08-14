// React
import {
  memo,
} from 'react';
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
  userRoleTemplateMapper,
} from '../UsersTable/UsersTable.type';
// style
import './UserRoleSelect.css';

type TuserRoleSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

function _UserRoleSelect(props: TuserRoleSelectProps) {
  const {
    value,
    onChange,
  } = props;

  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="UserRoleSelect-trigger">
        <SelectValue placeholder="권한을 선택해 주세요." />
      </SelectTrigger>

      <SelectContent>
        {Object.entries(userRoleTemplateMapper).map(([value, text]) => (
          <SelectItem
            key={value}
            className="UserRoleSelect-item"
            value={value}>
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const UserRoleSelect = memo(_UserRoleSelect);
export default UserRoleSelect;
