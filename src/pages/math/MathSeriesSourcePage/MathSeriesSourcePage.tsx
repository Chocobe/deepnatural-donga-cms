// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathSeriesSourceHeader from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceHeader/MathSeriesSourceHeader';
import MathSeriesSourceTableActions from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceTableActions/MathSeriesSourceTableActions';
import MathSeriesSourceTable from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceTable/MathSeriesSourceTable';
import MathSeriesSourceFooter from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceFooter/MathSeriesSourceFooter';
// type
import { 
  TRetrieveMathSeriesSourcesApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourcePage.css';

function MathSeriesSourcePage() {
  //
  // mathSeriesSourcePage store
  //
  const searchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.searchParamsForRetrieveMathSeriesSourcesApi);

  const setMathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.setMathSeriesSourcesData);
  const clearMathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.clearMathSeriesSourcesData);
  const clearSelectedMathSeriesSources = useMathSeriesSourcePageStore(state => state.clearSelectedMathSeriesSources);

  //
  // callback
  //
  const retrieveMathSeriesSources = useCallback(async (
    params: TRetrieveMathSeriesSourcesApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathSeriesSourcesApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathSeriesSourcesData(response.data);
    }
  }, [setMathSeriesSourcesData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathSeriesSources({
      searchParams: searchParamsForRetrieveMathSeriesSourcesApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathSeriesSources]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathSeriesSources();
      clearMathSeriesSourcesData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathSeriesSources]);

  return (
    <div className="MathSeriesSourcePage">
      <div className="MathSeriesSourcePage-header">
        <MathSeriesSourceHeader retrieveMathSeriesSources={retrieveMathSeriesSources} />
      </div>

      <div className="MathSeriesSourcePage-actions">
        <MathSeriesSourceTableActions retrieveMathSeriesSources={retrieveMathSeriesSources} />
      </div>

      <div className="MathSeriesSourcePage-table">
        <MathSeriesSourceTable />
      </div>

      <div className="MathSeriesSourcePage-footer">
        <MathSeriesSourceFooter retrieveMathSeriesSources={retrieveMathSeriesSources} />
      </div>
    </div>
  );
}

export default MathSeriesSourcePage;
