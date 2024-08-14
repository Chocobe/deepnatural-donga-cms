// react
import {
  useEffect,
} from 'react';
// route
import {
  useParams,
} from 'react-router-dom';
// store
import useMathTextbookDetailStore from '@/store/mathTextbookDetailStore/mathTextbookDetailStore';
// ui
import MathTextbookDetailHeader from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailHeader/MathTextbookDetailHeader';
import MathTextbookDetailMain from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailMain/MathTextbookDetailMain';
import MathTextbookDetailFooter from '@/components/pages/math/MathTextbookDetailPage/MathTextbookDetailFooter/MathTextbookDetailFooter';
// style
import './MathTextbookDetailPage.css';

function MathTextbookDetailPage() {
  //
  // mathTextbook store
  //
  const clearMathTextbookDetailStore = useMathTextbookDetailStore(state => state.clearMathTextbookDetailStore);

  //
  // hook
  //
  const routeParams = useParams();
  const textbookId = routeParams.textbookId;
  const isDetailMode = !!textbookId;

  //
  // effect
  //
  useEffect(function cleanup() {
    return () => {
      clearMathTextbookDetailStore();
    };
  }, [clearMathTextbookDetailStore]);

  return (
    <div className="MathTextbookDetailPage">
      <div className="MathTextbookDetailPage-header">
        <MathTextbookDetailHeader isDetailMode={isDetailMode} />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-main">
        <MathTextbookDetailMain />
      </div>

      <div className="MathTextbookDetailPage-divider" />

      <div className="MathTextbookDetailPage-footer">
        <MathTextbookDetailFooter isDetailMode={isDetailMode} />
      </div>
    </div>
  );
}

export default MathTextbookDetailPage;
