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
  userStatusTemplateMapper,
} from '../UsersTable/UsersTable.type';
import { 
  TUserModelStatus, 
  userModelStatusMapper,
} from '@/apis/models/authModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './UserStatusToggleButton.css';

type TUserStatusToggleButtonProps = {
  value: TUserModelStatus;
  onChange: (value: TUserModelStatus) => void;
};

function _UserStatusToggleButton(props: TUserStatusToggleButtonProps) {
  const {
    value,
    onChange,
  } = props;

  const onClick = useCallback((() => {
    const newValue = Object.values(userModelStatusMapper).find(newValue => {
      return value !== newValue;
    });

    onChange(newValue as TUserModelStatus);
  }), [value, onChange]);

  return (
    <Button
      className={cn(
        'UserStatusToggleButton',
        value
      )}
      variant={value === userModelStatusMapper.ACTIVE
        ? 'outline' 
        : 'destructive'
      }
      onClick={onClick}>
      {userStatusTemplateMapper[value]}
    </Button>
  );
}

const UserStatusToggleButton = memo(_UserStatusToggleButton) as typeof _UserStatusToggleButton;
export default UserStatusToggleButton;
