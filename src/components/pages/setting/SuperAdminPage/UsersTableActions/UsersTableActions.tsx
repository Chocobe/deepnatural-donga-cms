// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// ui
import AddUserModal from '../AddUserModal/AddUserModal';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import {
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
// icon
import { 
  LuSearch,
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

  const onChangeRoleSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRoleSearchValue(value);
  }, []);

  //
  // cache
  //
  const leftSideButtonTemplates = useMemo(() => [
    {
      text: '삭제',
      onClick: onClickRemove,
    },
  ], [onClickRemove]);

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
          placeholder="검색어를 입력해주세요"
          value={roleSearchValue}
          onChange={onChangeRoleSearchValue}
          EndIcon={LuSearch} />

        <AddUserModal />
      </div>
    </div>
  );
}

const UsersTableActions = memo(_UsersTableActions);
export default UsersTableActions;
