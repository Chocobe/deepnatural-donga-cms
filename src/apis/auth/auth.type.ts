// type
import { 
  TLoginModel, 
} from '../models/authModel.type';

//
// Login API
//
export type TLoginPayload = {
  username: string;
  password: string;
};

export type TLoginResponse = TLoginModel;
