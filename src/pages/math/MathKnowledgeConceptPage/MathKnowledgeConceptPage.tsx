// ui
import MathKnowledgeConceptHeader from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptHeader/MathKnowledgeConceptHeader';
import MathKnowledgeConceptTableActions from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptTableActions/MathKnowledgeConceptTableActions';
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
        Table
      </div>

      <div className="MathKnowledgeConceptPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathKnowledgeConceptPage;
