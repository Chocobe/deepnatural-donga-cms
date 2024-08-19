// type
import { 
  TLoginModel, 
  TUserModel,
  TGroupModel,
} from '../models/authModel.type';

//
// Login API
//
export type TLoginApiPayload = {
  username: string;
  password: string;
};

export type TLoginApiResponse = TLoginModel;

//
// UserInfo API
//
export type TRetrieveUserInfoApiPayload = {
  pathParams: {
    userId: string;
  };
};

export type TRetrieveUserInfoApiResponse = TUserModel;

//
// Groups API
//
export type TRetrieveGroupsApiResponse = TGroupModel[];
