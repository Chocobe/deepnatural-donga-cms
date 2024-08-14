// react
// route
import {
  useParams,
} from 'react-router-dom';
// ui
import MathTextbookDetailHeader from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailHeader/MathTextbookDetailHeader';
import MathTextbookDetailMain from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailMain/MathTextbookDetailMain';
// style
import './MathTextbookDetailPage.css';

function MathTextbookDetailPage() {
  //
  // hook
  //
  const routeParams = useParams();
  const textbookId = routeParams.textbookId;
  const isDetailMode = !!textbookId;

  return (
    <div className="MathTextbookDetailPage">
      <div className="MathTextbookDetailPage-header">
        <MathTextbookDetailHeader isDetailMode={isDetailMode} />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-main">
        <MathTextbookDetailMain isDetailMode={isDetailMode} />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathTextbookDetailPage;
