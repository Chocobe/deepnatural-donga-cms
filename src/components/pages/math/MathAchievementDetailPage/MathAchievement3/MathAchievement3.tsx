// react
import {
  useState,
  memo,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// ui
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  TMathAchievementPageStoreDetailAchievement3,
} from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import './MathAchievement3.css';

type TMathAchievement3Props = {
  indexOfAchievement2: number;
  indexOfAchievement3: number;
  achievement3: TMathAchievementPageStoreDetailAchievement3;
  onChangeAchievement3IsChecked: (params: {
    indexOfAchievement3: number;
    isChecked: boolean;
  }) => void;
};

function _MathAchievement3(props: TMathAchievement3Props) {
  const {
    indexOfAchievement2,
    indexOfAchievement3,
    achievement3,
    onChangeAchievement3IsChecked,
  } = props;

  const {
    no,
    title,
    code,
  } = achievement3;

  //
  // mathAchievementPage store
  //
  const updateDetailFormState = useMathAchievementPageStore(state => state.updateDetailFormState);

  //
  // state
  //
  const [isChecked, setIsChecked] = useState(false);

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => {
      const toggledIsChecked = !isChecked;

      onChangeAchievement3IsChecked({
        indexOfAchievement3,
        isChecked: toggledIsChecked,
      });

      return toggledIsChecked;
    });
  }, [
    indexOfAchievement3,
    onChangeAchievement3IsChecked,
  ]);

  const onChangeAchievement3 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
      achievement2_set: old.achievement2_set?.map((achievement2, index) => {
        return index !== indexOfAchievement2
          ? achievement2
          : {
            ...achievement2,
            achievement3_set: achievement2.achievement3_set.map((achievement3, index) => {
              return index !== indexOfAchievement3
                ? achievement3
                : {
                  ...achievement3,
                  [key]: value,
                };
            }),
          };
      }),
    }));
  }, [
    indexOfAchievement2, indexOfAchievement3,
    updateDetailFormState,
  ]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfAchievement2}-${indexOfAchievement3}-achievement3__no`,
      label: '순번',
      Component: (
        <Input
          id={`${indexOfAchievement2}-${indexOfAchievement3}-achievement3__no`}
          className="editor"
          value={no}
          onChange={onChangeAchievement3} />
      ),
    },
    {
      id: `${indexOfAchievement2}-${indexOfAchievement3}-achievement3__title`,
      label: '성취기준',
      Component: (
        <Input
          id={`${indexOfAchievement2}-${indexOfAchievement3}-achievement3__title`}
          className="editor"
          value={title}
          onChange={onChangeAchievement3} />
      ),
    },
    {
      id: `${indexOfAchievement2}-${indexOfAchievement3}-achievement3__code`,
      label: '표준코드',
      Component: (
        <Input
          id={`${indexOfAchievement2}-${indexOfAchievement3}-achievement3__code`}
          className="editor"
          value={code}
          onChange={onChangeAchievement3} />
      ),
    },
  ], [
    indexOfAchievement2, indexOfAchievement3,
    no, title, code,
    onChangeAchievement3,
  ]);

  return (
    <div className="MathAchievement3">
      <div className="MathAchievement3-header">
        <Checkbox
          className="checkbox"
          checked={isChecked}
          onCheckedChange={onChangeIsChecked} />

        <div className="title">
          성취기준
        </div>
      </div>

      <div className="MathAchievement3-formBody">
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

const MathAchievement3 = memo(_MathAchievement3);
export default MathAchievement3;
