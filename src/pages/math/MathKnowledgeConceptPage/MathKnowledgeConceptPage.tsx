// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathKnowledgeConceptPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathKnowledgeConcept Page mockup" />
  );
}

const MathKnowledgeConceptPage = memo(_MathKnowledgeConceptPage);
export default MathKnowledgeConceptPage;
