// react
import {
  useState,
  memo,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
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
// style
import './MathChapter3.css';

type TMathChapter3Props = {
  indexOfChapter3: number;
  chapter3: TMathChapterPageStoreDetailChapter3;
  onChange: (params: {
    indexOfChapter3: number;
    chapter3: TMathChapterPageStoreDetailChapter3;
  }) => void;
  onConfirmDelete: (indexOfChapter3: number) => void;
};

function _MathChapter3(props: TMathChapter3Props) {
  const {
    indexOfChapter3,
    chapter3,
    onChange,
  } = props;

  const {
    no,
    title,
  } = chapter3;

  //
  // state
  //
  const [isChecked, setIsChecked] = useState(false);

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => !isChecked);
  }, []);

  const onChangeChapter3 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    onChange({
      indexOfChapter3,
      chapter3: {
        ...chapter3,
        [id]: value,
      },
    });
  }, [
    indexOfChapter3, chapter3,
    onChange,
  ]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfChapter3}_chapter3_no`,
      label: '순번',
      Component: (
        <Input
          id={`${indexOfChapter3}_chapter3_no`}
          className="editor"
          value={no}
          onChange={onChangeChapter3} />
      ),
    },
    {
      id: `${indexOfChapter3}_chapter3_title`,
      label: '소단원 제목',
      Component: (
        <Input
          id={`${indexOfChapter3}_chapter3_title`}
          className="editor"
          value={title}
          onChange={onChangeChapter3} />
      ),
    },
  ], [
    indexOfChapter3, no, title,
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
