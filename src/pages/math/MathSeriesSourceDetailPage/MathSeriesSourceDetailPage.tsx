// react
import {
  useEffect,
} from 'react';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
// ui
import MathSeriesSourceDetailHeader from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailHeader/MathSeriesSourceDetailHeader';
import MathSeries from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeries/MathSeries';
import MathSeriesSourceDetailFooter from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailFooter/MathSeriesSourceDetailFooter';
// style
import './MathSeriesSourceDetailPage.css';

function MathSeriesSourceDetailPage() {
  //
  // store
  //
  const clearDetailTargetMathSeries = useMathSeriesSourcePageStore(state => state.clearDetailTargetMathSeries);

  //
  // useEffect
  //
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
        <MathSeriesSourceDetailFooter />
      </div>
    </div>
  );
}

export default MathSeriesSourceDetailPage;
