// ui
import MathSeriesSourceHeader from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceHeader/MathSeriesSourceHeader';
// style
import './MathSeriesSourcePage.css';

function MathSeriesSourcePage() {
  return (
    <div className="MathSeriesSourcePage">
      <div className="MathSeriesSourcePage-header">
        <MathSeriesSourceHeader />
      </div>

      <div className="MathSeriesSourcePage-actions">
        Actions
      </div>

      <div className="MathSeriesSourcePage-table">
        Table
      </div>

      <div className="MathSeriesSourcePage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathSeriesSourcePage;
