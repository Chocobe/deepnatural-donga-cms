// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishKnowledgeConceptPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishKnowledgeConcept Page mockup" />
  );
}

const EnglishKnowledgeConceptPage = memo(_EnglishKnowledgeConceptPage);
export default EnglishKnowledgeConceptPage;
