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
// Groups API
//
export type TGroupsApiResponse = TGroupModel[];
