// type
import { 
  TApiRequestNonBodyParams,
  TApiRequestBodyParams,
} from '../api.type';
import { 
  TPaginationModel,
} from '../models/cmsCommonModel.type';
import { 
  TLoginModel, 
  TUserModel,
  TGroupModel,
  TSignupModel,
} from '../models/authModel.type';

//
// 로그인
//
export type TLoginApiRequestParams = TApiRequestBodyParams<void, void, {
  username: string;
  password: string;
}>;

export type TLoginApiResponse = TLoginModel;

//
// 임시 비밀번호 생성
//
export type TRandomPasswordApiResponse = {
  password: string;
};

//
// 비밀번호 변경
//
export type TPatchChangePasswordApiRequestParams = TApiRequestBodyParams<void, void, {
  old_password: string;
  new_password: string;
  new_password2: string;
}>;
export type TPatchChangePasswordApiResponse = {
  message: string;
};

//
// 회원가입
//
export type TSignupApiRequestParams = TApiRequestBodyParams<void, void, TSignupModel>;

export type TSignupApiResponse = {
  message: string;
};

//
// (GET) 현재 계정의 사용자 정보
//
export type TRetrieveUserInfoApiResponse = TUserModel;

//
// (GET) 그룹 목록
//
export type TRetrieveGroupsApiResponse = TGroupModel[];

//
// (GET) 사용자 수
//
export type TRetrieveUsersCountApiResponse = {
  user_count: number;
  active_user_count: number;
  inactive_user_count: number;
};

//
// (GET) 사용자 목록
//
export type TRetrieveUsersApiRequestParams = TApiRequestNonBodyParams<
  void,
  {
    is_active?: boolean;
    page?: number;
    search?: string;
  }
>;

export type TRetrieveUsersApiResponse = TPaginationModel<TUserModel>;

//
// (PATCH) 사용자 수정
//
// FIXME: 비밀번호 변경 API 적용 시, password 추가하기
export type TPatchUserApiRequestParams = TApiRequestBodyParams<{
  userId: number;
}, void, {
  // 계정명 username 을 수정하는 것에 대한 의구심으로, 보류
  // username?: string;
  email?: string;
  phone?: string;
  groups?: number[];
  is_active?: boolean;
}>;

export type TPatchUserApiResponse = TUserModel;
