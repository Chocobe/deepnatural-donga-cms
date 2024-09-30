// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
import { 
  createSuccessApiSliceState,
} from '@/store/apiStateUtils';
// hook
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
// api
import ApiManager from '@/apis/ApiManager';

const useInitUserInfoAndGroups = () => {
  //
  // authApi store
  //
  const setUserInfoState = useAuthApiStore(state => state.userInfo.action.setUserInfoState);
  const setGroupsState = useAuthApiStore(state => state.groups.action.setGroupsState);

  //
  // hook
  //
  const {
    isLoggedIn,
  } = useIsLoggedIn();

  //
  // callback
  //
  const retrieveUser = useCallback(async () => {
    const response = await ApiManager
      .auth
      .retrieveUserInfoApi();

    if (response.data) {
      setUserInfoState(createSuccessApiSliceState(response.data));
    }
  }, [setUserInfoState]);

  const retrieveGroups = useCallback(async () => {
    const response = await ApiManager
      .auth
      .retrieveGroupsApi();

    if (response.data) {
      setGroupsState(createSuccessApiSliceState(response.data));
    }
  }, [setGroupsState]);

  //
  // effect
  //
  useEffect(function initUserInfoAndGroups() {
    if (!isLoggedIn) {
      return;
    }

    retrieveUser();
    retrieveGroups();

    // eslint-disable-next-line
  }, [isLoggedIn]);
};

export default useInitUserInfoAndGroups;
