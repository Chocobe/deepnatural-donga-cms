// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// api
import ApiManager from '@/apis/ApiManager';

const useInitMathPixAppKey = () => {
  //
  // mathQuestionToolPage store
  //
  const setMathPixAppKeyInfo_action = useMathQuestionToolPageStore(state => state.mathPixAuth.action.setMathPixAppKeyInfo_action);

  //
  // callback
  //
  const retrieveMathPixAppKey = useCallback(async () => {
    const response = await ApiManager
      .mathOCR
      .retrieveMathPixAppKey
      .callWithNoticeMessageGroup();

    const data = response?.data;

    if (data) {
      setMathPixAppKeyInfo_action(data);
    }
  }, [setMathPixAppKeyInfo_action]);

  //
  // effect
  //
  useEffect(function initMathPixAppKey() {
    retrieveMathPixAppKey();
  }, [retrieveMathPixAppKey]);
};

export default useInitMathPixAppKey;
