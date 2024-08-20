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
export type TRetrieveUserInfoApiPayload = {
  pathParams: {
    userId: string;
  };
};

export type TRetrieveUserInfoApiResponse = TUserModel;

//
// (GET) 그룹 목록
//
export type TRetrieveGroupsApiResponse = TGroupModel[];
