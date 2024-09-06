// react
import {
  useCallback,
  useEffect,
} from 'react';
// route
import {
  useParams,
} from 'react-router-dom';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathTextbookDetailHeader from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailHeader/MathTextbookDetailHeader';
import MathTextbookDetailMain from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailMain/MathTextbookDetailMain';
import MathTextbookDetailFooter from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailFooter/MathTextbookDetailFooter';
// type
import { 
  TRetrieveMathTextbookApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathTextbookDetailPage.css';

function MathTextbookDetailPage() {
  //
  // mathTextbook store
  //
  const setDetailTargetMathTextbook = useMathTextbookPageStore(state => state.setDetailTargetMathTextbook);
  const clearDetailTargetMathTextbook = useMathTextbookPageStore(state => state.clearDetailTargetMathTextbook);
  const clearDetailFormState = useMathTextbookPageStore(state => state.clearDetailFormState);

  //
  // hook
  //
  const routeParams = useParams();
  const textbookId = routeParams.textbookId;
  const isDetailMode = !!textbookId;

  //
  // callback
  //
  const retrieveMathTextbook = useCallback(async () => {
    if (!textbookId) {
      return;
    }

    const params: TRetrieveMathTextbookApiRequestParams = {
      pathParams: {
        textbookId,
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathTextbookApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setDetailTargetMathTextbook(response.data);
    }
  }, [
    textbookId,
    setDetailTargetMathTextbook,
  ]);

  //
  // effect
  //
  useEffect(function _retrieveMathTextbook() {
    retrieveMathTextbook();
  }, [retrieveMathTextbook]);

  useEffect(function cleanup() {
    return () => {
      // FIXME: clearDetailTargetMathText() 에서 detailFormState 까지 초기화하도록 store 변경하기
      clearDetailTargetMathTextbook();
      clearDetailFormState();
    };
  }, [clearDetailTargetMathTextbook, clearDetailFormState]);

  return (
    <div className="MathTextbookDetailPage">
      <div className="MathTextbookDetailPage-header">
        <MathTextbookDetailHeader 
          isDetailMode={isDetailMode}
          textbookId={textbookId} />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-main">
        <MathTextbookDetailMain />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-footer">
        <MathTextbookDetailFooter isDetailMode={isDetailMode} />
      </div>
    </div>
  );
}

export default MathTextbookDetailPage;
