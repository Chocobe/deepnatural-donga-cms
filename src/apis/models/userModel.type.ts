// type
import { 
  TGroupModel,
} from './authModel.type';

//
// User (사용자)
//
export const userModelIsActiveTemplateMapper = {
  true: '사용중',
  false: '사용중지',
} as const;

export type TUserModel = {
  id: number;
  username: string;
  email: string;
  phone: string;
  groups: TGroupModel[];
  is_active: boolean;
};
