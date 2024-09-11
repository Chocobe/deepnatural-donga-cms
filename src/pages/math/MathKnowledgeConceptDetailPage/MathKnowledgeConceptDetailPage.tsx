// react
import {
  useEffect,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// ui
import MathKnowledgeConceptDetailHeader from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailHeader/MathKnowledgeConceptDetailHeader';
import MathKnowledgeConcept1 from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConcept1/MathKnowledgeConcept1';
import MathKnowledgeConceptDetailFooter from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailFooter/MathKnowledgeConceptDetailFooter';
// style
import './MathKnowledgeConceptDetailPage.css';

function MathKnowledgeConceptDetailPage() {
  //
  // mathKnowledgeConceptPage store
  //
  const clearDetailTargetMathKnowledgeConcept = useMathKnowledgeConceptPageStore(state => state.clearDetailTargetMathKnowledgeConcept);

  //
  // effect
  //
  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathKnowledgeConcept();
    };
  }, [clearDetailTargetMathKnowledgeConcept]);

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
        <MathKnowledgeConceptDetailFooter />
      </div>
    </div>
  );
}

export default MathKnowledgeConceptDetailPage;
