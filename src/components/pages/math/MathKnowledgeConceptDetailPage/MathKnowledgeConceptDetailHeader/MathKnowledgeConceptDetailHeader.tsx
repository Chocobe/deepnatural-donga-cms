// react
import {
  memo,
} from 'react';
// style
import './MathKnowledgeConceptDetailHeader.css';

function _MathKnowledgeConceptDetailHeader() {
  return (
    <div className="MathKnowledgeConceptDetailHeader">
      <div className="MathKnowledgeConceptDetailHeader-title">
        지식개념
      </div>

      <div className="MathKnowledgeConceptDetailHeader-description">
        지식개념을 수정하거나, 추가할 수 있습니다.
      </div>
    </div>
  );
}

const MathKnowledgeConceptDetailHeader = memo(_MathKnowledgeConceptDetailHeader);
export default MathKnowledgeConceptDetailHeader;
