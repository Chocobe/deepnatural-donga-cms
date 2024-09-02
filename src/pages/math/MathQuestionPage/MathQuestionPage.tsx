// ui
import MathQuestionHeader from '@/components/pages/math/MathQuestionPage/MathQuestionHeader/MathQuestionHeader';
import MathQuestionTableActions from '@/components/pages/math/MathQuestionPage/MathQuestionTableActions/MathQuestionTableActions';
// style
import './MathQuestionPage.css';

function MathQuestionPage() {
  return (
    <div className="MathQuestionPage">
      <div className="MathQuestionPage-header">
        <MathQuestionHeader />
      </div>

      <div className="MathQuestionPage-actions">
        <MathQuestionTableActions />
      </div>

      <div className="MathQuestionPage-table">
        Table
      </div>

      <div className="MathQuestionPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathQuestionPage;
