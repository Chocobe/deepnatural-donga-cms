// ui
import MathKnowledgeConceptDetailHeader from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailHeader/MathKnowledgeConceptDetailHeader';
import MathKnowledgeConcept1 from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConcept1/MathKnowledgeConcept1';
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
        <MathKnowledgeConcept1 />
      </div>

      <div className="MathKnowledgeConceptDetailPage-divider" />

      <div className="MathKnowledgeConceptDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathKnowledgeConceptDetailPage;
