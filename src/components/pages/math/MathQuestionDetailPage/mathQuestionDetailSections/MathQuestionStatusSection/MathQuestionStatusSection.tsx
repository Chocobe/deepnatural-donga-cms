// react
import {
  useCallback,
  memo,
  useMemo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// ui
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
// style
import './MathQuestionStatusSection.css';

function _MathQuestionStatusSection() {
  //
  // mathQuestionPage store
  //
  const is_set = useMathQuestionPageStore(state => state.detailFormState.is_set);
  const individual_questioning = useMathQuestionPageStore(state => state.detailFormState.individual_questioning);
  const is_reviewed = useMathQuestionPageStore(state => state.detailFormState.is_reviewed);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // cache
  //
  const statusItems = useMemo(() => [
    {
      id: 'is_set',
      label: '세트 문제 여부',
      value: is_set,
    },
    {
      id: 'individual_questioning',
      label: '개별 출제',
      value: individual_questioning,
    },
    {
      id: 'is_reviewed',
      label: '검수 여부',
      value: is_reviewed,
    },
  ], [
    is_set,
    individual_questioning,
    is_reviewed,
  ]);

  //
  // callback
  //
  const onChangeStatus = useCallback((
    id: string,
    checked: boolean | string
  ) => {
    updateDetailFormState(old => ({
      ...old,
      [id]: checked,
    }));
  }, [updateDetailFormState]);

  return (
    <div className="MathQuestionStatusSection">
      {statusItems.map(item => {
        const {
          id,
          label,
          value,
        } = item;

        return (
          <div 
            key={id}
            className="MathQuestionStatusSection-item">
            <Checkbox
              id={id}
              className="checkbox"
              checked={value}
              onCheckedChange={checked => onChangeStatus(id, checked)} />

            <label
              htmlFor={id}
              className="label">
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

const MathQuestionStatusSection = memo(_MathQuestionStatusSection);
export default MathQuestionStatusSection;
