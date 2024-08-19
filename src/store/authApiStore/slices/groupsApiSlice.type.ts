// util
import { 
  createIdleApiSliceState,
} from '@/store/apiStateUtils';
// type
import { 
  TApiSliceState,
} from '@/store/apiStateUtils.type';
import { 
  TRetrieveGroupsApiResponse,
} from '@/apis/auth/authApi.type';

//
// state
//
export type TGroupsApiSliceState = TApiSliceState<TRetrieveGroupsApiResponse>;
export const initialGroupsApiSliceState: TGroupsApiSliceState = createIdleApiSliceState();

//
// action
//
export type TGroupsApiSliceAction = {
  clearGroupsState: () => void;
  setGroupsState: (groupsState: TApiSliceState<TRetrieveGroupsApiResponse>) => void;
};

export type TGroupsApiSlice = {
  groups: {
    state: TGroupsApiSliceState;
    action: TGroupsApiSliceAction;
  };
};
