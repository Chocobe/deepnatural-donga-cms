// react
import {
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuHistory,
} from 'react-icons/lu';
// style
import './MathQuestionDetailHeader.css';

function _MathQuestionDetailHeader() {
  return (
    <div className="MathQuestionDetailHeader">
      <div className="MathQuestionDetailHeader-titleWrapper">
        <div className="title">
          문항
        </div>

        <div className="description">
          문항을 수정하거나, 추가할 수 있습니다.
        </div>
      </div>

      <div className="MathQuestionDetailHeader-actionsWrapper">
        <Button
          className="button"
          variant="default"
          onClick={() => console.log('삭제')}>
          삭제
        </Button>

        <Button
          className="button"
          variant="default"
          onClick={() => console.log('히스토리')}>
          <LuHistory className="icon" />
          히스토리
        </Button>
      </div>
    </div>
  );
}

const MathQuestionDetailHeader = memo(_MathQuestionDetailHeader);
export default MathQuestionDetailHeader;
