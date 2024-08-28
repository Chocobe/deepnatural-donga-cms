// react
import {
  useCallback,
  useEffect,
} from 'react';
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
  // callback
  //
  const retrieveMathChapters = useCallback(async (
    params: TRetrieveMathChaptersApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathChaptersApi(params);

    console.log('response.data: ', response.data);
  }, []);

  useEffect(function init() {
    retrieveMathChapters({
      searchParams: {
        // FIXME: store 연동하기
      },
    });
  }, [retrieveMathChapters]);

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
