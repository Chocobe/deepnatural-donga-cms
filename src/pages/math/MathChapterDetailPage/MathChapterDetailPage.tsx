// ui
import MathChapterDetailHeader from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailHeader/MathChapterDetailHeader';
// style
import './MathChapterDetailPage.css';

function MathChapterDetailPage() {
  return (
    <div className="MathChapterDetailPage">
      <div className="MathChapterDetailPage-header">
        <MathChapterDetailHeader />
      </div>

      <div className="MathChapterDetailPage-divider" />

      <div className="MathChapterDetailPage-main">
        Main
      </div>

      <div className="MathChapterDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathChapterDetailPage;
