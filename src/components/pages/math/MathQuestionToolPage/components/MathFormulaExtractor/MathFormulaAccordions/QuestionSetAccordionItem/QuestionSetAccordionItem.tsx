// react
import {
  useMemo,
  useCallback,
  memo,
  MouseEvent,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useRemoveQuestionConfirmModal from '../../MathFormulaExtractorHeader/hooks/useRemoveQuestionConfirmModal';
// ui
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/shadcn-ui/ui/accordion';
import MathEditor from '../../../ui/MathEditor/MathEditor';
import BooleanEditor from '../../../ui/BooleanEditor/BooleanEditor';
import EnumEditor from '../../../ui/EnumEditor/EnumEditor';
import KnowledgeConcept from './KnowledgeConcept/KnowledgeConcept';
// icons
import { 
  FaRegTrashAlt,
} from "react-icons/fa";
// type
import { 
  TQuestionSetItemTemplate,
  questionSetCommonTemplate,
  questionTypeOptionsMapper,
  questionTypeTemplateMapper,
} from '../mathFormulaAccordions.type';
import { 
  TResultItem,
} from '@/store/mathStores/mathQuestionToolPageStore/slices/uiSlice/uiSlice.types';
import { 
  TMathEditorOnChangeParams,
} from '../../../ui/MathEditor/mathEditor.type';
import { 
  TBooleanEditorOnChangeParams,
} from '../../../ui/BooleanEditor/booleanEditor.type';
import { 
  TEnumEditorOnChangeParams,
} from '../../../ui/EnumEditor/enumEditor.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './QuestionSetAccordionItem.css';

type TQuestionSetAccordionItemProps = {
  index: number;
  accordionValue: string;
  isTarget: boolean;
  data: TResultItem;
  flagForAdjust: boolean;
};

function _QuestionSetAccordionItem(props: TQuestionSetAccordionItemProps) {
  const {
    index,
    accordionValue,
    isTarget,
    data,
    flagForAdjust,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const lengthOfQuestionSetsState = useMathQuestionToolPageStore(state => state.ui.state.result.questionSets.length);

  const setQuestionSetsValue_action = useMathQuestionToolPageStore(state => state.ui.action.setQuestionSetsValue_action);

  //
  // hook
  //
  const {
    onOpenRemoveQuestionConfirmModal,
  } = useRemoveQuestionConfirmModal();

  //
  // cache
  //
  const commonTemplates = useMemo(() => {
    return index === 0
      ? questionSetCommonTemplate
      : questionSetCommonTemplate.filter(question => {
        return !question.onlyFirstIndex;
      });
  }, [index]);

  const questionTypeTemplates = useMemo(() => {
    const questionType = data.question_type as keyof typeof questionTypeTemplateMapper;
    const templateFactory = questionTypeTemplateMapper[questionType];

    switch(questionType) {
      case questionTypeOptionsMapper['객관식(단답형)']:
      case questionTypeOptionsMapper['객관식(다답형)']: {
        return templateFactory();
      }
      case questionTypeOptionsMapper['주관식(단답형)']:
      case questionTypeOptionsMapper['주관식(선택형)']: {
        const shortAnswerCount = data.short_answer_count as number;
        return templateFactory?.(shortAnswerCount ?? 0) ?? [];
      }
      case questionTypeOptionsMapper['주관식(서술형)']: {
        return templateFactory();
      }
      case questionTypeOptionsMapper['주관식(그리기)']:
      case questionTypeOptionsMapper['주관식(선긋기)']: {
        return templateFactory();
      }
      default: {
        return [];
      }
    }
  }, [data.question_type, data.short_answer_count]);

  //
  // callback
  //
  const onChangeMathEditor = useCallback((
    params: TMathEditorOnChangeParams
  ) => {
    const {
      id,
      indexOfResult,
      latex = '',
    } = params;

    setQuestionSetsValue_action({
      id,
      indexOfResult,
      value: latex,
    });
  }, [setQuestionSetsValue_action]);

  const onChangeBooleanEditor = useCallback((
    params: TBooleanEditorOnChangeParams
  ) => {
    const {
      id,
      indexOfResult,
      value,
    } = params;

    setQuestionSetsValue_action({
      id,
      indexOfResult,
      value,
    });
  }, [setQuestionSetsValue_action]);

  const onChangeEnumEditor = useCallback((
    params: TEnumEditorOnChangeParams
  ) => {
    const {
      id,
      indexOfResult,
      value,
    } = params;

    setQuestionSetsValue_action({
      id,
      indexOfResult,
      value,
    });
  }, [setQuestionSetsValue_action]);

  const onClickDelete = useCallback((e: MouseEvent<SVGElement, any>) => {
    e.stopPropagation();

    onOpenRemoveQuestionConfirmModal(index);
  }, [index, onOpenRemoveQuestionConfirmModal]);

  const renderTemplate = useCallback((
    template: TQuestionSetItemTemplate
  ) => {
    const {
      id,
      label,
      type,
      options,
      placeholder,
      readonly,
    } = template;

    switch(type) {
      case 'latex':
      case 'text':
      case 'number': {
        if (
          id === 'instruction' &&
          lengthOfQuestionSetsState === 1
        ) {
          return null;
        }

        return (
          <MathEditor
            key={`${index}-${id}`}
            indexOfResult={index}
            id={id}
            type={type}
            readonly={readonly}
            placeholder={placeholder}
            value={data[id] as string}
            mathML=""
            label={label}
            flagForAdjust={flagForAdjust}
            onChange={onChangeMathEditor} />
        );
      }

      case 'boolean': {
        return (
          <BooleanEditor
            key={`${index}-${id}`}
            id={id}
            indexOfResult={index}
            label={label}
            placeholder={placeholder}
            value={data[id] as boolean}
            onChange={onChangeBooleanEditor} />
        );
      }

      case 'enum/string':
      case 'enum/number': {
        return (
          <EnumEditor
            key={`${index}-${id}`}
            id={id}
            indexOfResult={index}
            options={options}
            label={label}
            placeholder={placeholder}
            value={data[id] as string}
            onChange={onChangeEnumEditor}
          />
        );
      }

      case 'kc2': {
        // FIXME: 수정 후, 적용하기
        return (
          <KnowledgeConcept 
            key={`${index}-${id}`}
            indexOfResult={index} />
        );
      }

      default: {
        return null;
      }
    }
  }, [
    data, flagForAdjust, index, 
    lengthOfQuestionSetsState,
    onChangeMathEditor,
    onChangeBooleanEditor,
    onChangeEnumEditor,
  ]);

  return (<>
    <AccordionItem
      value={accordionValue}
      className={cn(
        'QuestionSetAccordionItem',
        isTarget ? 'isTarget' : ''
      )}>
      <AccordionTrigger className="p-0">
        <div className="QuestionSetAccordionItem-trigger">
          <div className="itemName">
            문항 {index + 1}
          </div>

          <div className="actionsWrapper">
            {index > 0 && (
              <FaRegTrashAlt 
                className="actionButton"
                size="20px" 
                onClick={onClickDelete}/>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="p-4 h-auto">
        <div className="QuestionSetAccordionItem-content">
          {commonTemplates.map(renderTemplate)}
          {questionTypeTemplates.map(renderTemplate)}
        </div>
      </AccordionContent>
    </AccordionItem>
  </>);
}

const QuestionSetAccordionItem = memo(_QuestionSetAccordionItem);
export default QuestionSetAccordionItem;
