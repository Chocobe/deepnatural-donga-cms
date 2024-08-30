// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
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
  const searchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.searchParamsForRetrieveMathTextbooksApi);

  const setMathTextbooksData = useMathTextbookPageStore(state => state.setMathTextbooksData);
  const clearSelectedMathTextbooks = useMathTextbookPageStore(state => state.clearSelectedMathTextbooks);

  //
  // callback
  //
  const retrieveMathTextbooks = useCallback(async (
    params: TRetrieveMathTextbooksApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathTextbooksApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathTextbooksData(response.data);
    }
  }, [
    setMathTextbooksData,
  ]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathTextbooks({
      searchParams: searchParamsForRetrieveMathTextbooksApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathTextbooks]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathTextbooks();
    };

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathTextbooksApi.page,
  ]);

  return (
    <div className="MathTextbookPage">
      <div className="MathTextbookPage-header">
        <MathTextbookHeader retrieveMathTextbooks={retrieveMathTextbooks} />
      </div>

      <div className="MathTextbookPage-actions">
        <MathTextbookTableActions retrieveMathTextbooks={retrieveMathTextbooks} />
      </div>

      <div className="MathTextbookPage-table">
        <MathTextbookTable />
      </div>

      <div className="MathTextbookPage-footer">
        <MathTextbookFooter retrieveMathTextbooks={retrieveMathTextbooks} />
      </div>
    </div>
  );
}

export default MathTextbookPage;
