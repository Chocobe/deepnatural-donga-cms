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
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathChapterDetailHeader from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailHeader/MathChapterDetailHeader';
import MathChapter1 from '@/components/pages/math/MathChapterDetailPage/MathChapter1/MathChapter1';
import MathChapterDetailFooter from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailFooter/MathChapterDetailFooter';
// type
import { 
  TRetrieveMathChapterApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathChapterDetailPage.css';

function MathChapterDetailPage() {
  //
  // mathChapterPage store
  //
  const setDetailTargetMathChapter = useMathChapterPageStore(state => state.setDetailTargetMathChapter);
  const updateDetailFormStateReference = useMathChapterPageStore(state => state.updateDetailFormStateReference);

  const clearDetailTargetMathChapter = useMathChapterPageStore(state => state.clearDetailTargetMathChapter);

  //
  // hook
  //
  const routeParams = useParams();
  const chapterId = routeParams.chapterId;
  const isDetailMode = !!chapterId;

  //
  // callback
  //
  const retrieveMathChapter = useCallback(async () => {
    if (!chapterId) {
      return;
    }

    const params: TRetrieveMathChapterApiRequestParams = {
      pathParams: {
        chapterId,
      },
    };

    const chapterResponse = await ApiManager
      .math
      .retrieveMathChapterApi
      .callWithNoticeMessageGroup(params);

    const chapterData = chapterResponse?.data;

    if (!chapterData) {
      return;
    }

    const textbookResponse = await ApiManager
      .math
      .retrieveMathTextbookApi({
        pathParams: {
          textbookId: chapterData.textbook_id,
        },
      });

    const textbookData = textbookResponse?.data;

    setDetailTargetMathChapter(chapterResponse.data);
    updateDetailFormStateReference(old => ({
      ...old,
      textbook: textbookData,
    }));
  }, [
    chapterId,
    setDetailTargetMathChapter,
    updateDetailFormStateReference,
  ]);

  //
  // effect
  //
  useEffect(function _retrieveMathChapter() {
    retrieveMathChapter();
  }, [retrieveMathChapter]);

  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathChapter();
    };
  }, [clearDetailTargetMathChapter]);

  return (
    <div className="MathChapterDetailPage">
      <div className="MathChapterDetailPage-header">
        <MathChapterDetailHeader />
      </div>

      <div className="MathChapterDetailPage-divider" />

      <div className="MathChapterDetailPage-main">
        <MathChapter1 />
      </div>

      <div className="MathChapterDetailPage-divider" />

      <div className="MathChapterDetailPage-footer">
        <MathChapterDetailFooter isDetailMode={isDetailMode} />
      </div>
    </div>
  );
}

export default MathChapterDetailPage;
