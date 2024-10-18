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
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathSeriesSourceDetailHeader from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailHeader/MathSeriesSourceDetailHeader';
import MathSeries from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeries/MathSeries';
import MathSeriesSourceDetailFooter from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailFooter/MathSeriesSourceDetailFooter';
// type
import { 
  TRetrieveMathSeriesSourceApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourceDetailPage.css';

function MathSeriesSourceDetailPage() {
  //
  // store
  //
  const setDetailTargetMathSeries = useMathSeriesSourcePageStore(state => state.setDetailTargetMathSeries);

  const clearDetailTargetMathSeries = useMathSeriesSourcePageStore(state => state.clearDetailTargetMathSeries);

  //
  // hook
  //
  const routeParams = useParams();
  const seriesId = routeParams.seriesId;
  const isDetailMode = !!seriesId;

  //
  // callback
  //
  const retrieveMathSeriesSource = useCallback(async () => {
    if (!seriesId) {
      return;
    }

    const params: TRetrieveMathSeriesSourceApiRequestParams = {
      pathParams: {
        seriesId,
      },
    };

    const seriesResponse = await ApiManager
      .math
      .retrieveMathSeriesSourceApi
      .callWithNoticeMessageGroup(params);

    const seriesData = seriesResponse?.data;

    if (seriesData) {
      setDetailTargetMathSeries(seriesData);
    }
  }, [
    seriesId,
    setDetailTargetMathSeries,
  ]);

  //
  // useEffect
  //
  useEffect(function _retrieveMathSeriesSource() {
    retrieveMathSeriesSource();
  }, [retrieveMathSeriesSource]);

  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathSeries();
    };
  }, [clearDetailTargetMathSeries]);

  return (
    <div className="MathSeriesSourceDetailPage">
      <div className="MathSeriesSourceDetailPage-header">
        <MathSeriesSourceDetailHeader />
      </div>

      <div className="MathSeriesSourceDetailPage-divider" />

      <div className="MathSeriesSourceDetailPage-main">
        <MathSeries />
      </div>

      <div className="MathSeriesSourceDetailPage-divider" />

      <div className="MathSeriesSourceDetailPage-footer">
        <MathSeriesSourceDetailFooter isDetailMode={isDetailMode} />
      </div>
    </div>
  );
}

export default MathSeriesSourceDetailPage;
