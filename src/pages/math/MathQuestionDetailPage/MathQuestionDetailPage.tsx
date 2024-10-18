// react
import {
  useCallback,
  useEffect,
} from 'react';
// router
import { 
  useParams,
} from 'react-router-dom';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// ui
import MathQuestionDetailHeader from '@/components/pages/math/MathQuestionDetailPage/MathQuestionDetailHeader/MathQuestionDetailHeader';
import MathQuestionDetailMain from '@/components/pages/math/MathQuestionDetailPage/MathQuestionDetailMain/MathQuestionDetailMain';
import MathQuestionDetailFooter from '@/components/pages/math/MathQuestionDetailPage/MathQuestionDetailFooter/MathQuestionDetailFooter';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  TRetrieveMathQuestionApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathQuestionDetailPage.css';

function MathQuestionDetailPage() {
  //
  // mathQuestionPage store
  //
  const setDetailTargetMathQuestion = useMathQuestionPageStore(state => state.setDetailTargetMathQuestion);
  const clearDetailTargetMathQuestion = useMathQuestionPageStore(state => state.clearDetailTargetMathQuestion);

  //
  // hook
  //
  const routeParams = useParams();
  const questionId = routeParams.questionId;

  //
  // callback
  //
  const retrieveMathQuestion = useCallback(async () => {
    if (!questionId) {
      return;
    }

    const params: TRetrieveMathQuestionApiRequestParams = {
      pathParams: {
        questionId,
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathQuestionApi
      .callWithNoticeMessageGroup(params);

    const questionData = response?.data;

    if (!questionData) {
      return;
    }

    setDetailTargetMathQuestion(questionData);
  }, [
    questionId,
    setDetailTargetMathQuestion,
  ]);

  //
  // effect
  //
  useEffect(function initMathQuestionDetailData() {
    retrieveMathQuestion();
  }, [retrieveMathQuestion]);

  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathQuestion();
    };
  }, [clearDetailTargetMathQuestion]);

  return (
    <div className="MathQuestionDetailPage">
      <div className="MathQuestionDetailPage-header">
        <MathQuestionDetailHeader />
      </div>

      <div className="MathQuestionDetailPage-main">
        <MathQuestionDetailMain />
      </div>

      <div className="MathQuestionDetailPage-footer">
        <MathQuestionDetailFooter />
      </div>
    </div>
  );
}

export default MathQuestionDetailPage;
