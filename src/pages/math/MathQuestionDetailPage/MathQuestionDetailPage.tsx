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
  // mathQuestionToolPage store
  //
  // FIXME: 여기까지 작업함
  // FIXME: 기존 작업도구와 store 호환이 안되는 상황
  // FIXME: => 기존 작업도구의 `metadata` 속성이 현재는 없기 때문

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
        Main
      </div>

      <div className="MathQuestionDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathQuestionDetailPage;
