// ui
import MathKnowledgeConceptDetailHeader from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailHeader/MathKnowledgeConceptDetailHeader';
// style
import './MathKnowledgeConceptDetailPage.css';

function MathKnowledgeConceptDetailPage() {
  return (
    <div className="MathKnowledgeConceptDetailPage">
      <div className="MathKnowledgeConceptDetailPage-header">
        <MathKnowledgeConceptDetailHeader />
      </div>

      <div className="MathKnowledgeConceptDetailPage-divider" />

      <div className="MathKnowledgeConceptDetailPage-main">
        Main
      </div>

      <div className="MathKnowledgeConceptDetailPage-divider" />

      <div className="MathKnowledgeConceptDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathKnowledgeConceptDetailPage;
