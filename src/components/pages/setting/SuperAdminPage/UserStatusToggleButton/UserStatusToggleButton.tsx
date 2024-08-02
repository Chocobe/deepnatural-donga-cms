// react
import {
  memo,
  useCallback,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// type
import { 
  mockUserStatusMapper,
  mockUserStatusTemplateMapper,
  TMockUserStatus,
} from '../UsersTable/UsersTable.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './UserStatusToggleButton.css';

type TUserStatusToggleButtonProps = {
  value: TMockUserStatus;
  onChange: (value: TMockUserStatus) => void;
};

function _UserStatusToggleButton(props: TUserStatusToggleButtonProps) {
  const {
    value,
    onChange,
  } = props;

  const onClick = useCallback((() => {
    const newValue = Object.values(mockUserStatusMapper).find(newValue => {
      return value !== newValue;
    });

    onChange(newValue as TMockUserStatus);
  }), [value, onChange]);

  return (
    <Button
      className={cn(
        'UserStatusToggleButton',
        value
      )}
      variant={value === mockUserStatusMapper.ACTIVE
        ? 'outline' 
        : 'destructive'
      }
      onClick={onClick}>
      {mockUserStatusTemplateMapper[value]}
    </Button>
  );
}

const UserStatusToggleButton = memo(_UserStatusToggleButton) as typeof _UserStatusToggleButton;
export default UserStatusToggleButton;
