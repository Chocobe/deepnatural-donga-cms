// react
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
} from 'react';
// ui
import { 
  Checkbox,
  CHECKBOX_INDETERMINATE,
} from '@/components/shadcn-ui/ui/checkbox';
// type
import { 
  TMathKnowledgeConcept1Model,
} from '@/apis/models/mathModel.type';
import { 
  CheckedState,
} from '@radix-ui/react-checkbox';
import { 
  TKC1Selection,
  TKC1SelectionMapper,
} from './MathKCSelectionSection.type';
// style
import './MathKCSelectionSection.css';

type TMathKCSelectionSectionProps = {
  kc1List: TMathKnowledgeConcept1Model[];
  kc1SelectionMapper: TKC1SelectionMapper;
  setKC1SelectionMapper: Dispatch<SetStateAction<{
    [kc1Id: string]: TKC1Selection;
  }>>;
};

function _MathKCSelectionSection(props: TMathKCSelectionSectionProps) {
  const {
    kc1List,
    kc1SelectionMapper,
    setKC1SelectionMapper,
  } = props;

  //
  // callback
  //
  const onChangeKC1 = useCallback((
    checkedState: CheckedState,
    id: string
  ) => {
    if (typeof checkedState === 'boolean') {
      setKC1SelectionMapper(old => {
        const kc1Selection = old[id];

        const newKC2SelectionMapper = Object
          .entries(kc1Selection.kc2SelectionMapper)
          .reduce((newKC2Selection, [kc2Id, kc2Selection]) => ({
            ...newKC2Selection,
            [kc2Id]: {
              ...kc2Selection,
              checked: checkedState,
            },
          }), {} as TKC1Selection['kc2SelectionMapper']);

        return {
          ...old,
          [kc1Selection.kc1.id]: {
            ...kc1Selection,
            checked: checkedState,
            kc2SelectionMapper: newKC2SelectionMapper,
          },
        };
      });
    }
  }, [setKC1SelectionMapper]);

  const onChangeKC2 = useCallback((params: {
    checkedState: CheckedState;
    kc1Id: string;
    kc2Id: string;
  }) => {
    const {
      checkedState,
      kc1Id,
      kc2Id,
    } = params;

    setKC1SelectionMapper(old => {
      const targetKC1Selection = old[kc1Id];
      const targetKC2Selection = targetKC1Selection.kc2SelectionMapper[kc2Id];

      const newKC2SelectionMapper: TKC1Selection['kc2SelectionMapper'] = {
        ...targetKC1Selection.kc2SelectionMapper,
        [kc2Id]: {
          ...targetKC2Selection,
          checked: checkedState,
        },
      };

      const isAllChecked = Object
        .values(newKC2SelectionMapper)
        .every(kc2Selection => kc2Selection.checked);

      const isSomeChecked = Object
        .values(newKC2SelectionMapper)
        .some(kc2Selection => kc2Selection.checked);

      const kc1Checked = isAllChecked
        ? true
        : isSomeChecked
          ? CHECKBOX_INDETERMINATE
          : false;

      return {
        ...old,
        [targetKC1Selection.kc1.id]: {
          ...targetKC1Selection,
          checked: kc1Checked,
          kc2SelectionMapper: newKC2SelectionMapper,
        },
      };
    });
  }, [setKC1SelectionMapper]);

  return (
    <div className="MathKCSelectionSection">
      {kc1List.length
        ? kc1List.map(kc1 => {
          const {
            id,
            title,
            kc2_set,
          } = kc1;

          const kc1Selection = kc1SelectionMapper[id];
          const kc1Checked = kc1Selection?.checked ?? false;

          return (
            <div 
              key={id}
              className="MathKCSelectionSection-checkboxGroup">
              <div className="kc1">
                <Checkbox
                  id={`selection-${id}-${title}`}
                  className="checkbox"
                  checked={kc1Checked}
                  onCheckedChange={checkedState => onChangeKC1(checkedState, String(id))} />

                <label
                  className="label"
                  htmlFor={`selection-${id}-${title}`}>
                  {title}
                </label>
              </div>

              <div className="kc2Wrapper">
                {kc2_set.map(kc2 => (
                  <div 
                    key={`selection-${id}-${kc2.id}-${kc2.title}`}
                    className="kc2">
                    <Checkbox
                      id={`selection-${id}-${kc2.id}-${kc2.title}`}
                      className="checkbox"
                      checked={kc1Selection?.kc2SelectionMapper[kc2.id].checked ?? false}
                      onCheckedChange={checkedState => onChangeKC2({
                        checkedState,
                        kc1Id: String(id),
                        kc2Id: String(kc2.id),
                      })}
                    />

                    <label
                      htmlFor={`selection-${id}-${kc2.id}-${kc2.title}`}
                      className="label">
                      {kc2.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })
        : (
          <div className="MathKCSelectionSection-placeholder">
            성취기준을 선택해 주세요.
          </div>
        )
      }
    </div>
  );
}

const MathKCSelectionSection = memo(_MathKCSelectionSection);
export default MathKCSelectionSection;
