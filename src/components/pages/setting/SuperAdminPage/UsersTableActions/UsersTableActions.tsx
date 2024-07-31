// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import {
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
// icon
import { 
  LuSearch,
  LuUserPlus,
} from "react-icons/lu";
// style
import './UsersTableActions.css';

function _UsersTableActions() {
  //
  // state
  //
  const [roleSearchValue, setRoleSearchValue] = useState('');

  //
  // callback
  //
  const onClickRemove = useCallback(() => {
    console.log('onClickRemove()');
  }, []);

  const onClickEdit = useCallback(() => {
    console.log('onClickEdit()');
  }, []);

  const onClickToggleUserStatus = useCallback(() => {
    console.log('onClickToggleUserStatus()');
  }, []);

  const onChangeRoleSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRoleSearchValue(value);
  }, []);

  const onClickAddUser = useCallback(() => {
    console.log('onClickAddUser()');
  }, []);

  //
  // cache
  //
  const leftSideButtonTemplates = useMemo(() => [
    {
      text: '삭제',
      onClick: onClickRemove,
    },
    {
      text: '수정',
      onClick: onClickEdit,
    },
    {
      text: '사용중지',
      onClick: onClickToggleUserStatus,
    },
  ], [
    onClickRemove,
    onClickEdit,
    onClickToggleUserStatus,
  ]);

  return (
    <div className="UsersTableActions">
      <div className="UsersTableActions-leftSide">
        {leftSideButtonTemplates.map(template => {
          const {
            text,
            onClick,
          } = template;

          return (
            <Button
              key={text}
              className="UsersTableActions-leftSide-button"
              onClick={onClick}>
              {text}
            </Button>
          );
        })}
      </div>

      <div className="UsersTableActions-rightSide">
        <InputWithIcon 
          className="UsersTableActions-rightSide-roleSearchInput"
          value={roleSearchValue}
          onChange={onChangeRoleSearchValue}
          EndIcon={LuSearch} />

        <Button
          className="UsersTableActions-rightSide-addUserButton"
          onClick={onClickAddUser}>
          <LuUserPlus className="UsersTableActions-rightSide-addUserButton-icon" />
          유저 등록
        </Button>
      </div>
    </div>
  );
}

const UsersTableActions = memo(_UsersTableActions);
export default UsersTableActions;
