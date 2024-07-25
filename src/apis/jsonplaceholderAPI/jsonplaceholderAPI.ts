import api from '../api';
import { TJsonplaceholderUser } from './jsonplaceholderAPI.type';

export const retrieveUsersAPI = async () => {
  try {
    const response = await api.get<TJsonplaceholderUser>('/users');
    return response.data;
  } catch(error) {
    //
  }
};
