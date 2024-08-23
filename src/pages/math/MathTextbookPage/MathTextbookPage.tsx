// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathTextbookHeader from '@/components/pages/math/MathTextbookPage/MathTextbookHeader/MathTextbookHeader';
import MathTextbookTableActions from '@/components/pages/math/MathTextbookPage/MathTextbookTableActions/MathTextbookTableActions';
import MathTextbookTable from '@/components/pages/math/MathTextbookPage/MathTextbookTable/MathTextbookTable';
import MathTextbookFooter from '@/components/pages/math/MathTextbookPage/MathTextbookFooter/MathTextbookFooter';
// type
import { 
  TRetrieveMathTextbooksApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathTextbookPage.css';

function MathTextbookPage() {
  //
  // mathTextbooksPage store
  //
  const setMathTextbooksData = useMathTextbookPageStore(state => state.setMathTextbooksData);

  //
  // callback
  //
  const retrieveMathTextbooks = useCallback(async () => {
    // FIXME: filter 연동 하기
    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        //
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathTextbooksApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathTextbooksData(response.data);
    }
  }, [setMathTextbooksData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathTextbooks();
  }, [retrieveMathTextbooks]);

  return (
    <div className="MathTextbookPage">
      <div className="MathTextbookPage-header">
        <MathTextbookHeader />
      </div>

      <div className="MathTextbookPage-actions">
        <MathTextbookTableActions />
      </div>

      <div className="MathTextbookPage-table">
        <MathTextbookTable />
      </div>

      <div className="MathTextbookPage-footer">
        <MathTextbookFooter />
      </div>
    </div>
  );
}

export default MathTextbookPage;
