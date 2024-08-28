// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathChapterPageStore/mathChapterPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathChapterHeader from '@/components/pages/math/MathChapterPage/MathChapterHeader/MathChapterHeader';
import MathChapterTableActions from '@/components/pages/math/MathChapterPage/MathChapterTableActions/MathChapterTableActions';
import MathChapterTable from '@/components/pages/math/MathChapterPage/MathChapterTable/MathChapterTable';
import MathChapterFooter from '@/components/pages/math/MathChapterPage/MathChapterFooter/MathChapterFooter';
import { 
  TRetrieveMathChaptersApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathChapterPage.css';

function MathChapterPage() {
  //
  // useMathChapterPage store
  //
  const searchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.searchParamsForRetrieveMathChaptersApi);

  const setMathChaptersData = useMathChapterPageStore(state => state.setMathChaptersData);
  const clearSelectedMathChapters = useMathChapterPageStore(state => state.clearSelectedMathChapters);
  const clearMathChaptersData = useMathChapterPageStore(state => state.clearMathChaptersData);

  //
  // callback
  //
  const retrieveMathChapters = useCallback(async (
    params: TRetrieveMathChaptersApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathChaptersApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathChaptersData(response.data);
    }
  }, [setMathChaptersData]);

  useEffect(function init() {
    retrieveMathChapters({
      searchParams: searchParamsForRetrieveMathChaptersApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathChapters]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathChapters();
      clearMathChaptersData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathChapters]);

  return (
    <div className="MathChapterPage">
      <div className="MathChapterPage-header">
        <MathChapterHeader />
      </div>

      <div className="MathChapterPage-actions">
        <MathChapterTableActions />
      </div>

      <div className="MathChapterPage-table">
        <MathChapterTable />
      </div>

      <div className="MathChapterPage-footer">
        <MathChapterFooter />
      </div>
    </div>
  );
}

export default MathChapterPage;
