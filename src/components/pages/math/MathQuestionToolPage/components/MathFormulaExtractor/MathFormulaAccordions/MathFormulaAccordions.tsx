// react
import {
  useState,
  useEffect,
  memo,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// ui
import {
  Accordion,
} from '@/components/shadcn-ui/ui/accordion';
// ui
import SubjectAccordionItem from './SubjectAccordionItem/SubjectAccordionItem';
import SourceMetadataAccordionItem from './SourceMetadataAccordionItem/SourceMetadataAccordionItem';
import TextbookAccordionItem from './TextbookAccordionItem/TextbookAccordionItem';
import QuestionSetAccordionItem from './QuestionSetAccordionItem/QuestionSetAccordionItem';
// type
import { 
  NUM_OF_METADATA_ITEMS,
} from './mathFormulaAccordions.type';

function _MathFormulaAccordions() {
  //
  // mathQuestionToolPage store
  //
  const submissionStatisticsState = useMathQuestionToolPageStore(state => state.ui.state.submissionStatistics);
  const questionSetsState = useMathQuestionToolPageStore(state => state.ui.state.result.questionSets);

  //
  // state
  //
  const [targetIndexOfResultList, setTargetIndexOfResultList] = useState<string[]>([]);

  //
  // effect
  //
  useEffect(function initTargetIndexOfResultList() {
    setTargetIndexOfResultList([]);
  }, [submissionStatisticsState]);

  return (
    <Accordion 
      className="MathFormulaAccordion"
      type="multiple"
      value={targetIndexOfResultList}
      onValueChange={setTargetIndexOfResultList}>
      <SubjectAccordionItem />

      <SourceMetadataAccordionItem
        accordionValue="1"
        isTarget={targetIndexOfResultList.includes('1')} />

      <TextbookAccordionItem
        accordionValue="2"
        isTarget={targetIndexOfResultList.includes('2')} />

      {questionSetsState.map((result, index) => {
        const indexOfAccordionItem = String(NUM_OF_METADATA_ITEMS + index);

        return (
          <QuestionSetAccordionItem
            key={indexOfAccordionItem}
            accordionValue={indexOfAccordionItem}
            isTarget={targetIndexOfResultList.includes(indexOfAccordionItem)}
            index={index}
            data={result}
            flagForAdjust={targetIndexOfResultList.includes(indexOfAccordionItem)} />
        );
      })}
    </Accordion>
  );
}

const MathFormulaAccordions = memo(_MathFormulaAccordions);
export default MathFormulaAccordions;
