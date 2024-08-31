// ui
import MathSeriesSourceHeader from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceHeader/MathSeriesSourceHeader';
import MathSeriesSourceTableActions from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceTableActions/MathSeriesSourceTableActions';
import MathSeriesSourceTable from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceTable/MathSeriesSourceTable';
import MathSeriesSourceFooter from '@/components/pages/math/MathSeriesSourcePage/MathSeriesSourceFooter/MathSeriesSourceFooter';
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
        <MathSeriesSourceTable />
      </div>

      <div className="MathSeriesSourcePage-footer">
        <MathSeriesSourceFooter />
      </div>
    </div>
  );
}

export default MathSeriesSourcePage;
