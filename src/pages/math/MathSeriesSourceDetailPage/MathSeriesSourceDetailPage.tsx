// ui
import MathSeriesSourceDetailHeader from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailHeader/MathSeriesSourceDetailHeader';
import MathSeries from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeries/MathSeries';
// style
import './MathSeriesSourceDetailPage.css';

function MathSeriesSourceDetailPage() {
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
        Footer
      </div>
    </div>
  );
}

export default MathSeriesSourceDetailPage;
