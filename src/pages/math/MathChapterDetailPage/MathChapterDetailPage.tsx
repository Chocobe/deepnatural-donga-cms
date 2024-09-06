// ui
import MathChapterDetailHeader from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailHeader/MathChapterDetailHeader';
import MathChapter1 from '@/components/pages/math/MathChapterDetailPage/MathChapter1/MathChapter1';
import MathChapterDetailFooter from '@/components/pages/math/MathChapterDetailPage/MathChapterDetailFooter/MathChapterDetailFooter';
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

      <div className="MathChapterDetailPage-divider" />

      <div className="MathChapterDetailPage-footer">
        <MathChapterDetailFooter />
      </div>
    </div>
  );
}

export default MathChapterDetailPage;
