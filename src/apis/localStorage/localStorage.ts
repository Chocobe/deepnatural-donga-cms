// type
import { localStorageKeyMapper } from './localStorage.type';
import { TLoginModel } from '../models/authModel.type';

export const getToken = () =>  {
  const token = window.localStorage.getItem(
    localStorageKeyMapper.TOKEN
  );

  if (typeof token === 'string') {
    const jsonToken = JSON.parse(token);
    return jsonToken as TLoginModel;
  }

  return null;
};

export const setToken = (token: TLoginModel) => {
  const stringToken = JSON.stringify(token);

  window.localStorage.setItem(
    localStorageKeyMapper.TOKEN,
    stringToken
  );
};
