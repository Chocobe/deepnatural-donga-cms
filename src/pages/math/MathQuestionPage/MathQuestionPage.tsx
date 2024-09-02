// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathQuestionHeader from '@/components/pages/math/MathQuestionPage/MathQuestionHeader/MathQuestionHeader';
import MathQuestionTableActions from '@/components/pages/math/MathQuestionPage/MathQuestionTableActions/MathQuestionTableActions';
import MathQuestionTable from '@/components/pages/math/MathQuestionPage/MathQuestionTable/MathQuestionTable';
import MathQuestionFooter from '@/components/pages/math/MathQuestionPage/MathQuestionFooter/MathQuestionFooter';
// type
import { 
  TRetrieveMathQuestionsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathQuestionPage.css';

function MathQuestionPage() {
  //
  // mathQuestionPage store
  //
  const searchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.searchParamsForRetrieveMathQuestionsApi);

  const setMathQuestionsData = useMathQuestionPageStore(state => state.setMathQuestionsData);
  const clearMathQuestionsData = useMathQuestionPageStore(state => state.clearMathQuestionsData);
  const clearSelectedMathQuestions = useMathQuestionPageStore(state => state.clearSelectedMathQuestions);

  //
  // callback
  //
  const retrieveMathQuestions = useCallback(async (
    params: TRetrieveMathQuestionsApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathQuestionsApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathQuestionsData(response.data);
    }
  }, [setMathQuestionsData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathQuestions({
      searchParams: searchParamsForRetrieveMathQuestionsApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathQuestions]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathQuestions();
      clearMathQuestionsData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathQuestions]);

  return (
    <div className="MathQuestionPage">
      <div className="MathQuestionPage-header">
        <MathQuestionHeader />
      </div>

      <div className="MathQuestionPage-actions">
        <MathQuestionTableActions />
      </div>

      <div className="MathQuestionPage-table">
        <MathQuestionTable />
      </div>

      <div className="MathQuestionPage-footer">
        <MathQuestionFooter />
      </div>
    </div>
  );
}

export default MathQuestionPage;
