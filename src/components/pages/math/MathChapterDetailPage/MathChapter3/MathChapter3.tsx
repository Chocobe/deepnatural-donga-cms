// react
import {
  useState,
  memo,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
// ui
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  TMathChapterPageStoreDetailChapter3,
} from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import './MathChapter3.css';

type TMathChapter3Props = {
  indexOfChapter2: number;
  indexOfChapter3: number;
  chapter3: TMathChapterPageStoreDetailChapter3;
  onChangeChapter3IsChecked: (params: {
    indexOfChapter3: number;
    isChecked: boolean;
  }) => void;
};

function _MathChapter3(props: TMathChapter3Props) {
  const {
    indexOfChapter2,
    indexOfChapter3,
    chapter3,
    onChangeChapter3IsChecked,
  } = props;

  const {
    no,
    title,
  } = chapter3;

  //
  // mathChapterPage store
  //
  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);

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

      onChangeChapter3IsChecked({
        indexOfChapter3,
        isChecked: toggledIsChecked,
      });

      return toggledIsChecked;
    });
  }, [
    indexOfChapter3,
    onChangeChapter3IsChecked,
  ]);

  const onChangeChapter3 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
      chapter2_set: old.chapter2_set?.map((chapter2, index) => {
        return index !== indexOfChapter2
          ? chapter2
          : {
            ...chapter2,
            chapter3_set: chapter2.chapter3_set.map((chapter3, index) => {
              return index !== indexOfChapter3
                ? chapter3
                : {
                  ...chapter3,
                  [key]: value
                };
            }),
          };
      }),
    }));
  }, [
    indexOfChapter2, indexOfChapter3,
    updateDetailFormState,
  ]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfChapter2}-${indexOfChapter3}-chapter3__no`,
      label: '순번',
      Component: (
        <Input
          id={`${indexOfChapter2}-${indexOfChapter3}-chapter3__no`}
          className="editor"
          value={no}
          onChange={onChangeChapter3} />
      ),
    },
    {
      id: `${indexOfChapter2}-${indexOfChapter3}-chapter3__title`,
      label: '소단원 제목',
      Component: (
        <Input
          id={`${indexOfChapter2}-${indexOfChapter3}-chapter3__title`}
          className="editor"
          value={title}
          onChange={onChangeChapter3} />
      ),
    },
  ], [
    indexOfChapter2, indexOfChapter3,
    no, title,
    onChangeChapter3,
  ]);

  return (
    <div className="MathChapter3">
      <div className="MathChapter3-header">
        <Checkbox
          className="checkbox"
          checked={isChecked}
          onCheckedChange={onChangeIsChecked} />

        <div className="title">
          소단원
        </div>
      </div>

      <div className="MathChapter3-formBody">
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

const MathChapter3 = memo(_MathChapter3);
export default MathChapter3;
