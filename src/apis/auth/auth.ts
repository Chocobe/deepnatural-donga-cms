// api
import api from '../api';
// type
import { 
  TLoginPayload,
  TLoginResponse,
} from './auth.type';
import authUrlFactory from './authUrlFactory';

export const login = (payload: TLoginPayload) => {
  return api.post<TLoginResponse>(
    authUrlFactory.login(),
    payload
  );
};
