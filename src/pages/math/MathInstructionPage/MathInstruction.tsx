// ui
import MathInstructionHeader from '@/components/pages/math/MathInstrurctionPage/MathInstructionHeader/MathInstructionHeader';
import MathInstructionTableActions from '@/components/pages/math/MathInstrurctionPage/MathInstructionTableActions/MathInstructionTableActions';
import MathInstructionTable from '@/components/pages/math/MathInstrurctionPage/MathInstructionTable/MathInstructionTable';
// style
import './MathInstructionPage.css';

function MathInstructionPage() {
  return (
    <div className="MathInstructionPage">
      <div className="MathInstructionPage-header">
        <MathInstructionHeader />
      </div>

      <div className="MathInstructionPage-actions">
        <MathInstructionTableActions />
      </div>

      <div className="MathInstructionPage-table">
        <MathInstructionTable />
      </div>

      <div className="MathInstructionPage-footer">
        footer
      </div>
    </div>
  );
}

export default MathInstructionPage;
