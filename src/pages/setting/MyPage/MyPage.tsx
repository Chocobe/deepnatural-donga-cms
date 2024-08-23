// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  FC,
  ChangeEvent,
  FormEvent,
} from 'react';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import ChangePasswordModal from '@/components/pages/setting/MyPage/ChangePasswordModal/ChangePasswordModal';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  BLANK_ROLE_GROUP,
} from '@/components/pages/setting/SuperAdminPage/UserRoleSelect/UserRoleSelect.type';
import { 
  TPatchUserApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './MyPage.css';

function MyPage() {
  //
  // authApi store
  //
  const userInfoState = useAuthApiStore(state => state.userInfo.state);
  const userInfo = userInfoState.data;
  const {
    is_superuser,
  } = userInfo ?? {};

  const setUserInfoState = useAuthApiStore(state => state.userInfo.action.setUserInfoState);

  //
  // state
  //
  const [formState, setFormState] = useState<{
    groups: string;
    username: string;
    email: string;
    password: string;
    phone: string;
  }>(() => {
    const {
      username,
      email,
      phone,
      groups,
    } = userInfo ?? {};

    return {
      groups: groups?.[0]?.name ?? BLANK_ROLE_GROUP.name,
      username: username ?? '',
      email: email ?? '',
      password: '******',
      phone: phone ?? '',
    };
  });

  //
  // cache
  //
  const formItems = useMemo<{
    id: keyof typeof formState;
    type: 'text' | 'email' | 'password' | 'tel';
    label: string;
    placeholder?: string;
    disabled?: boolean;
    isHide?: boolean;
    ActionButton?: FC
  }[]>(() => [
    {
      id: 'groups',
      type: 'text',
      label: '권한설정',
      placeholder: undefined,
      disabled: true,
      isHide: is_superuser,
      ActionButton: undefined,
    },
    {
      id: 'username',
      type: 'text',
      label: '아이디',
      placeholder: undefined,
      disabled: !is_superuser,
      ActionButton: undefined,
    },
    {
      id: 'email',
      type: 'email',
      label: '이메일',
      placeholder: '이메일을 입력해 주세요.',
      ActionButton: undefined,
    },
    {
      id: 'password',
      type: 'password',
      label: '비밀번호',
      isHide: is_superuser,
      disabled: true,
      placeholder: '비밀번호를 입력해 주세요.',
      ActionButton: () => (
        <ChangePasswordModal />
      ),
    },
    {
      id: 'phone',
      type: 'tel',
      label: '휴대전화',
      placeholder: '휴대전화 번호를 입력해 주세요.',
      ActionButton: undefined,
    },
  ], [is_superuser]);

  //
  // callback
  //
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    setFormState(state => ({
      ...state,
      [id]: value,
    }));
  }, []);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!userInfo) {
      return;
    }

    const {
      email,
      phone,
    } = formState;

    // FIXME: 비밀번호 변경 API 적용 시, password 추가하기
    const params: TPatchUserApiRequestParams = {
      pathParams: {
        userId: userInfo.id
      },
      payload: {
        email,
        phone,
      },
    };

    const response = await ApiManager
      .auth
      .patchUserApi
      .callWithNoticeMessageGroup(params);

    setUserInfoState({
      ...userInfoState,
      data: {
        ...userInfo,
        email: response?.data.email ?? email,
        phone: response?.data.phone ?? phone,
      },
    });
  }, [
    userInfoState, userInfo, formState,
    setUserInfoState,
  ]);

  const initFormState = useCallback(() => {
    if (!userInfo) {
      return;
    }

    const {
      username,
      email,
      phone,
      groups,
    } = userInfo;

    setFormState({
      groups: groups?.[0]?.name ?? BLANK_ROLE_GROUP.name,
      username: username,
      email: email,
      password: '******',
      phone: phone ?? '',
    });
  }, [userInfo]);

  //
  // effect
  //
  useEffect(function _initFormState() {
    initFormState();
  }, [initFormState]);

  return (
    <div className="MyPage">
      <div className="MyPage-header">
        <h2 className="MyPage-header-title">
          My Page {is_superuser && ('(Super Admin)')}
        </h2>

        <div className="MyPage-header-description">
          개인 정보를 수정하고, 권한 설정을 할 수 있습니다.
        </div>
      </div>

      <form 
        className="MyPage-form"
        onSubmit={onSubmit}>
        {formItems.map(item => {
          const {
            id,
            type,
            label,
            placeholder,
            disabled,
            isHide,
            ActionButton,
          } = item;

          return !isHide && (
            <div 
              key={id}
              className="formItem">
              <Label 
                htmlFor={id}
                className="label">
                {label}
              </Label>

              <div className="inputWrapper">
                <Input
                  id={id}
                  type={type}
                  className="input"
                  placeholder={placeholder}
                  disabled={disabled}
                  value={formState[id]}
                  onChange={onChange} />

                {ActionButton && (
                  <ActionButton />
                )}
              </div>
            </div>
          );
        })}

        <div className="footer">
          <Button
            className=""
            variant="outline"
            size="sm"
            type="button"
            onClick={initFormState}>
            취소
          </Button>

          <Button
            className=""
            variant="default"
            size="sm"
            type="submit">
            저장하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MyPage;
