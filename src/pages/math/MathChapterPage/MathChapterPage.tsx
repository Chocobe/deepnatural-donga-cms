// ui
import MathChapterHeader from '@/components/pages/math/MathChapterPage/MathChapterHeader/MathChapterHeader';
import MathChapterTableActions from '@/components/pages/math/MathChapterPage/MathChapterTableActions/MathChapterTableActions';
import MathChapterTable from '@/components/pages/math/MathChapterPage/MathChapterTable/MathChapterTable';
import MathChapterFooter from '@/components/pages/math/MathChapterPage/MathChapterFooter/MathChapterFooter';
// style
import './MathChapterPage.css';

function MathChapterPage() {
  return (
    <div className="MathChapterPage">
      <div className="MathChapterPage-header">
        <MathChapterHeader />
      </div>

      <div className="MathChapterPage-actions">
        <MathChapterTableActions />
      </div>

      <div className="MathChapterPage-table">
        <MathChapterTable />
      </div>

      <div className="MathChapterPage-footer">
        <MathChapterFooter />
      </div>
    </div>
  );
}

export default MathChapterPage;
