// ui
import MathSeriesSourceHeader from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceHeader/MathSeriesSourceHeader';
import MathSeriesSourceTableActions from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceTableActions/MathSeriesSourceTableActions';
// style
import './MathSeriesSourcePage.css';

function MathSeriesSourcePage() {
  return (
    <div className="MathSeriesSourcePage">
      <div className="MathSeriesSourcePage-header">
        <MathSeriesSourceHeader />
      </div>

      <div className="MathSeriesSourcePage-actions">
        <MathSeriesSourceTableActions />
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
