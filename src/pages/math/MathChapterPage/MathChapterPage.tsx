// ui
import MathChapterHeader from '@/components/pages/math/MathChapterPage/MathChapterHeader/MathChapterHeader';
import MathChapterTableActions from '@/components/pages/math/MathChapterPage/MathChapterTableActions/MathChapterTableActions';
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
        Table
      </div>

      <div className="MathChapterPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathChapterPage;
