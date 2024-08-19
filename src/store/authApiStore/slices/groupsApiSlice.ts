// zustand
import { 
  TStateCreatorWithDevtools,
} from '@/store/apiStateUtils.type';
import { 
  TAuthApiStore,
} from '../authApiStore.type';
import { 
  initialGroupsApiSliceState,
  TGroupsApiSlice,
} from './groupsApiSlice.type';
import { 
  createIdleApiSliceState,
} from '@/store/apiStateUtils';

const createGroupsApiSlice: TStateCreatorWithDevtools<
  TAuthApiStore,
  TGroupsApiSlice
> = (set, _get) => ({
  groups: {
    state: initialGroupsApiSliceState,
    action: {
      clearGroupsState: () => {
        set(old => ({
          ...old,
          groups: {
            ...old.groups,
            state: createIdleApiSliceState(),
          },
        }), false, 'clearGroupsState');
      },

      setGroupsState: groupsState => {
        set(old => ({
          ...old,
          groups: {
            ...old.groups,
            state: groupsState,
          },
        }), false, 'setGroupsState');
      },
    },
  },
});

export default createGroupsApiSlice;
