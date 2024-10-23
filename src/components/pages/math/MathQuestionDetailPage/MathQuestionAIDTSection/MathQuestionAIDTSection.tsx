// react
import {
  useMemo,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useHandleMathQuestionDetailEditors from '../mathQuestionDetailSections/hooks/useHandleMathQuestionDetailEditors';
// ui
import MathQuestionDetailSectionTemplate from '../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';

function _MathQuestionAIDTSection() {
  //
  // mathQuestionPage store
  //
  const aidt_info = useMathQuestionPageStore(state => state.detailFormState.aidt_info);

  //
  // hook
  //
  const {
    onChangeInput,
  } = useHandleMathQuestionDetailEditors();

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: 'AIDT INFO',
      id: 'aidt_info',
      fluid: true,
      components: [
        {
          Editor: (
            <Input
              id="aidt_info"
              value={aidt_info}
              onChange={onChangeInput} />
          ),
        },
      ],
    },
  ], [
    aidt_info,
    onChangeInput,
  ]);

  return (
    <MathQuestionDetailSectionTemplate>
      {sectionItems.map((item, index) => {
        const {
          id,
          label,
          components,
          fluid,
          isHide,
        } = item;

        return (
          <MathQuestionDetailSectionItemTemplate
            key={id ?? index}
            id={id}
            label={label}
            components={components}
            fluid={fluid}
            isHide={isHide} />
        );
      })}
    </MathQuestionDetailSectionTemplate>
  );
}

const MathQuestionAIDTSection = memo(_MathQuestionAIDTSection);
export default MathQuestionAIDTSection;
