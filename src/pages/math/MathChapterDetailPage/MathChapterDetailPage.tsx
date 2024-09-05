// ui
import MathChapterDetailHeader from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailHeader/MathChapterDetailHeader';
import MathChapter1 from '@/components/pages/math/MathChapterDetailPage/MathChapter1/MathChapter1';
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
        <MathChapter1 />
      </div>

      <div className="MathChapterDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathChapterDetailPage;
