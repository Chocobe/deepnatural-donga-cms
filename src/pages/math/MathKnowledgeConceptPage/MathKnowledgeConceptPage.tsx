// ui
import MathKnowledgeConceptHeader from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptHeader/MathKnowledgeConceptHeader';
import MathKnowledgeConceptTableActions from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptTableActions/MathKnowledgeConceptTableActions';
import MathKnowledgeConceptTable from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptTable/MathKnowledgeConceptTable';
import MathKnowledgeConceptFooter from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptFooter/MathKnowledgeConceptFooter';
// style
import './MathKnowledgeConceptPage.css';

function MathKnowledgeConceptPage() {
  return (
    <div className="MathKnowledgeConceptPage">
      <div className="MathKnowledgeConceptPage-header">
        <MathKnowledgeConceptHeader />
      </div>

      <div className="MathKnowledgeConceptPage-actions">
        <MathKnowledgeConceptTableActions />
      </div>

      <div className="MathKnowledgeConceptPage-table">
        <MathKnowledgeConceptTable />
      </div>

      <div className="MathKnowledgeConceptPage-footer">
        <MathKnowledgeConceptFooter />
      </div>
    </div>
  );
}

export default MathKnowledgeConceptPage;
