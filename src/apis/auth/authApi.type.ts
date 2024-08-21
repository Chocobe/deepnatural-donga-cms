// type
import { 
  TLoginModel, 
  TUserModel,
  TGroupModel,
} from '../models/authModel.type';

//
// 로그인
//
export type TLoginApiPayload = {
  username: string;
  password: string;
};

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
export type TRetrieveUsersApiSearchParams = {
  is_active?: boolean;
  page?: number;
  search?: string;
};

export type TRetrieveUsersApiResponse = {
  current_page: number;
  last_page: number;
  results: TUserModel[];
};

//
// (PATCH) 사용자 수정
//
export type TPatchUserApiPathParams = {
  userId: number;
};

export type TPatchUserApiPayload = {
  // 계정명 username 을 수정하는 것에 대한 의구심으로, 보류
  // username?: string;
  email?: string;
  phone?: string;
  groups?: number[];
  is_active?: boolean;
};

export type TPatchUserApiResponse = TUserModel;
