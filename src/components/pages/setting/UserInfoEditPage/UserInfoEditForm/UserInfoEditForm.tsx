// react
import {
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// ui
import UserRoleSelect from '../../SuperAdminPage/UserRoleSelect/UserRoleSelect';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  TGroupModel,
} from '@/apis/models/authModel.type';
// style
import './UserInfoEditForm.css';

function UserInfoEditForm() {
  //
  // superAdminPage store
  //
  const detailTargetUser = useSuperAdminPageStore(state => state.detailTargetUser);
  const setDetailTargetUser = useSuperAdminPageStore(state => state.setDetailTargetUser);

  //
  // callback
  //
  const preventSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  const onChangeRole = useCallback((groups: TGroupModel[]) => {
    setDetailTargetUser(detailTargetUser => {
      return detailTargetUser
        ? {
          ...detailTargetUser,
          groups,
        }: undefined;
    });
  }, [setDetailTargetUser]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    setDetailTargetUser(detailTargetUser => {
      return detailTargetUser
        ? {
          ...detailTargetUser,
          [id]: value,
        }: undefined;
    });
  }, [setDetailTargetUser]);

  //
  // cache
  //
  const formItems = useMemo(() => {
    if (!detailTargetUser) {
      return null;
    }

    return [
      {
        id: 'role',
        label: '권한설정',
        Component: (
          <UserRoleSelect
            value={detailTargetUser.groups}
            onChange={onChangeRole} />
        ),
      },
      {
        id: 'username',
        label: '아이디',
        Component: (
          <Input
            id="username"
            disabled
            value={detailTargetUser.username}
            onChange={onChangeInput} />
        ),
      },
      {
        id: 'email',
        label: '이메일',
        Component: (
          <Input
            id="email"
            value={detailTargetUser.email}
            onChange={onChangeInput} />
        ),
      },
      {
        id: 'phone',
        label: '휴대전화',
        Component:  (
          <Input
            id="phone"
            value={detailTargetUser.phone ?? ''}
            onChange={onChangeInput} />
        ),
      },
    ];
  }, [
    detailTargetUser,
    onChangeRole, onChangeInput,
  ]);

  return (
    <form 
      className="UserInfoEditForm"
      onSubmit={preventSubmit}>
      {formItems?.map(item => {
        const {
          id,
          label,
          Component,
        } = item;

        return (
          <div 
            key={id}
            className="UserInfoEditForm-item">
            <label 
              htmlFor={id}
              className="label">
              {label}
            </label>

            {Component}
          </div>
        );
      })}
    </form>
  );
}

export default UserInfoEditForm;
