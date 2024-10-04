// react
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// hook
import useAdjustTextareaHeight from '@/components/hooks/useAdjustTextareaHeight';
// ui
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  Textarea,
} from '@/components/shadcn-ui/ui/textarea';
// type
import { 
  TMathKnowledgeConceptPageStoreDetailKC2,
} from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import './MathKnowledgeConcept2.css';

type TMathKnowledgeConcept2Props = {
  indexOfKC2: number;
  kc2: TMathKnowledgeConceptPageStoreDetailKC2;
  onChangeKC2IsChecked: (params: {
    indexOfKC2: number;
    isChecked: boolean;
  }) => void;
};

function _MathKnowledgeConcept2(props: TMathKnowledgeConcept2Props) {
  const {
    indexOfKC2,
    kc2,
    onChangeKC2IsChecked,
  } = props;

  const {
    title,
    comment,
  } = kc2;

  //
  // mathKnowledgeConceptPage store
  //
  const updateDetailFormState = useMathKnowledgeConceptPageStore(state => state.updateDetailFormState);

  //
  // ref
  //
  const $textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //
  // state
  //
  const [isChecked, setIsChecked] = useState(false);

  //
  // hook
  //
  const {
    adjustTextareaHeight,
  } = useAdjustTextareaHeight();

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => {
      const toggledIsChecked = !isChecked;

      onChangeKC2IsChecked({
        indexOfKC2,
        isChecked: toggledIsChecked,
      });

      return toggledIsChecked;
    });
  }, [
    indexOfKC2,
    onChangeKC2IsChecked,
  ]);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      id,
      value,
    } = e.target;

    const key = extractLastString(id, '__') as string;

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      kc2_set: old.kc2_set?.map((kc2, index) => {
        return index !== indexOfKC2
          ? kc2
          : {
            ...kc2,
            [key]: value,
          };
      }) ?? [],
    }));
  }, [indexOfKC2, updateDetailFormState]);

  const onChangeTextarea = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeInput(e);

    const $textarea = e.target as HTMLTextAreaElement;
    adjustTextareaHeight($textarea);
  }, [onChangeInput, adjustTextareaHeight]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfKC2}-kc2__title`,
      label: '제목',
      Component: (
        <Input
          id={`${indexOfKC2}-kc2__title`}
          className="editor"
          value={title}
          onChange={onChangeInput} />
      ),
    },
    {
      id: `${indexOfKC2}-kc2__comment`,
      label: '참고',
      Component: (
        <Textarea
          ref={$textareaRef}
          id={`${indexOfKC2}-chapter3__comment`}
          className="editor"
          value={comment ?? ''}
          onChange={onChangeTextarea} />
      ),
    },
  ], [
    indexOfKC2,
    title,
    comment,
    onChangeInput, 
    onChangeTextarea,
  ]);

  //
  // effect
  //
  useEffect(function initTextareaHeight() {
    adjustTextareaHeight($textareaRef.current);
  }, [adjustTextareaHeight]);

  return (
    <div className="MathKnowledgeConcept2">
      <div className="MathKnowledgeConcept2-header">
        <Checkbox
          className="checkbox"
          checked={isChecked}
          onCheckedChange={onChangeIsChecked} />

        <div className="title">
          지식개념2
        </div>
      </div>

      <div className="MathKnowledgeConcept2-formBody">
        {formItems.map(item => {
          const {
            id,
            label,
            Component,
          } = item;

          return (
            <div 
              key={id}
              className="formItem">
              <label
                htmlFor={id}
                className="label">
                {label}
              </label>

              {Component}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MathKnowledgeConcept2 = memo(_MathKnowledgeConcept2);
export default MathKnowledgeConcept2;
