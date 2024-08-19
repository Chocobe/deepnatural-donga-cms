// util
import { 
  createIdleApiSliceState,
} from '@/store/apiStateUtils';
// type
import { 
  TApiSliceState,
} from '@/store/apiStateUtils.type';
import { 
  TGroupsApiResponse,
} from '@/apis/auth/authApi.type';

//
// state
//
export type TGroupsApiSliceState = TApiSliceState<TGroupsApiResponse>;
export const initialGroupsApiSliceState: TGroupsApiSliceState = createIdleApiSliceState();

//
// action
//
export type TGroupsApiSliceAction = {
  clearGroupsState: () => void;
  setGroupsState: (groupsState: TApiSliceState<TGroupsApiResponse>) => void;
};

export type TGroupsApiSlice = {
  groups: {
    state: TGroupsApiSliceState;
    action: TGroupsApiSliceAction;
  };
};
