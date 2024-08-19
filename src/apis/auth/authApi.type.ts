// type
import { 
  TLoginModel, 
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
// User API
//
export type TRetrieveUserApiPayload = {
  pathParams: {
    userId: string;
  };
};

export type TRetrieveUserApiResponse = any;

//
// Groups API
//
export type TRetrieveGroupsApiResponse = TGroupModel[];
