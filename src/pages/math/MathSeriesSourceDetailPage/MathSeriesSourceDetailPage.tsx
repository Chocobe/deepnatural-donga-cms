// ui
import MathSeriesSourceDetailHeader from '@/components/pages/math/MathSeriesSourceDetailPage/MathSeriesSourceDetailHeader/MathSeriesSourceDetailHeader';
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
        Main
      </div>

      <div className="MathSeriesSourceDetailPage-divider" />

      <div className="MathSeriesSourceDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathSeriesSourceDetailPage;
