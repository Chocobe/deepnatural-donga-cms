// type
import { 
  TApiRequestNonBodyParams,
  TApiRequestBodyParams,
} from '../api.type';
import { 
  TLoginModel, 
  TUserModel,
  TGroupModel,
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
// (GET) 현재 계정의 사용자 정보
//
export type TRetrieveUserInfoApiResponse = TUserModel;

//
// (GET) 그룹 목록
//
export type TRetrieveGroupsApiResponse = TGroupModel[];

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

export type TRetrieveUsersApiResponse = {
  current_page: number,
  last_page: number,
  /** 페이지당 row 개수 */
  page_size: number,
  /** (페이지네이션 미적용) 전체 row 개수 */
  count: number,
  /** 이전 페이지네이션 api path */
  previous: string | null,
  /** 이전 페이지네이션 api path */
  next: string | null,
  results: TUserModel[];
};

//
// (GET) 사용자 수
//
export type TRetrieveUsersCountApiResponse = {
  user_count: number;
  active_user_count: number;
  inactive_user_count: number;
};

//
// (PATCH) 사용자 수정
//
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
