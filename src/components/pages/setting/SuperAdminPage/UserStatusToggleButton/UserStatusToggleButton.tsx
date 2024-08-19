// react
import {
  memo,
  MouseEvent,
  useCallback,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// type
import { 
  userModelIsActiveTemplateMapper,
} from '@/apis/models/userModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './UserStatusToggleButton.css';

type TUserStatusToggleButtonProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

function _UserStatusToggleButton(props: TUserStatusToggleButtonProps) {
  const {
    value,
    onChange,
  } = props;

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onChange(!value);
  }, [value, onChange]);

  return (
    <Button
      className={cn(
        'UserStatusToggleButton',
        value
      )}
      variant={value
        ? 'outline' 
        : 'destructive'
      }
      onClick={onClick}>
      {userModelIsActiveTemplateMapper[String(value)]}
    </Button>
  );
}

const UserStatusToggleButton = memo(_UserStatusToggleButton) as typeof _UserStatusToggleButton;
export default UserStatusToggleButton;
