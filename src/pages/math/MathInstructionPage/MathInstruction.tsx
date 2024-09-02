// ui
import MathInstructionHeader from '@/components/pages/math/MathInstrurctionPage/MathInstructionHeader/MathInstructionHeader';
// style
import './MathInstructionPage.css';

function MathInstructionPage() {
  return (
    <div className="MathInstructionPage">
      <div className="MathInstructionPage-header">
        <MathInstructionHeader />
      </div>

      <div className="MathInstructionPage-actions">
        actions
      </div>

      <div className="MathInstructionPage-table">
        table
      </div>

      <div className="MathInstructionPage-footer">
        footer
      </div>
    </div>
  );
}

export default MathInstructionPage;
