// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
import { 
  TMathChapterPageStoreDetailChapter2,
} from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore.type';
// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn-ui/ui/accordion';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
import MathChapter3 from '../MathChapter3/MathChapter3';
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapter2.css';

type TMathChapter2Props = {
  indexOfChapter2: number;
  chapter2: TMathChapterPageStoreDetailChapter2;
};

function _MathChapter2(props: TMathChapter2Props) {
  const {
    indexOfChapter2,
    chapter2,
  } = props;

  const {
    no,
    title,
  } = chapter2;

  //
  // mathChapterPage store
  //
  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('chapter2');
  const [isChecked, setIsChecked] = useState(false);

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => !isChecked);
  }, []);

  const onClickDelete = useCallback(() => {
    // TODO: confirmModal(ResultNoticeModal) 열기

    // FIXME: onConfirmDelete() 로 옮기기
    updateDetailFormState(old => ({
      ...old,
      chapter2_set: old.chapter2_set?.filter((_oldChapter2, index) => {
        return index !== indexOfChapter2;
      }),
    }));
  }, [indexOfChapter2, updateDetailFormState]);

  const onChangeChapter2 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    const key = extractLastString(id, '__');

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      chapter2_set: old.chapter2_set?.map((oldChapter2, index) => {
        return index !== indexOfChapter2
          ? oldChapter2
          : {
            ...oldChapter2,
            [key]: value,
          };
      }),
    }));
  }, [indexOfChapter2, updateDetailFormState]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: 'chapter2__no',
      label: '순번',
      Component: (
        <Input
          id="chapter2__no"
          className="editor"
          value={no}
          onChange={onChangeChapter2}
        />
      ),
    },
    {
      id: 'chapter2__title',
      label: '중단원 제목',
      Component: (
        <Input
          id="chapter2__title"
          className="editor"
          value={title}
          onChange={onChangeChapter2}
        />
      ),
    },
  ], [
    no, title,
    onChangeChapter2,
  ]);

  return (
    <Accordion
      className="MathChapter2"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem
        className="MathChapter2-accordionItem"
        value="chapter2">
        <div className="header">
          <div className="actionsWrapper">
            <div className="notice">
              {indexOfChapter2 === 0
                ? '* 중단원은 최소 1개 이상 이어야 합니다.'
                : ' '
              }
            </div>

            <Button
              className="deleteButton"
              onClick={onClickDelete}>
              삭제
            </Button>
          </div>

          <AccordionTrigger className="title">
            중단원
          </AccordionTrigger>
        </div>

        <AccordionContent className="content">
          <div className="formBody">
            {formItems.map((item, itemIndex) => {
              const {
                id,
                label,
                Component,
              } = item;

              return (
                <div
                  key={id}
                  className={cn(
                    'formItem',
                    itemIndex === 0 ? 'small' : ''
                  )}>
                  <label
                    htmlFor={id}
                    className="label">
                    {itemIndex === 0 && (
                      <Checkbox 
                        className="checkbox" 
                        checked={isChecked}
                        onCheckedChange={onChangeIsChecked} />
                    )}

                    {label}
                  </label>

                  {Component}
                </div>
              );
            })}
          </div>

          <div className="chapter3Wrapper">
            <div className="list">
              {chapter2.chapter3_set.map((chapter3, indexOfChapter3) => (
                <MathChapter3
                  key={indexOfChapter3}
                  indexOfChapter3={indexOfChapter3}
                  chapter3={chapter3}
                  onChange={() => console.log('onChnge() - chapter3')}
                  onConfirmDelete={() => console.log('onConfirmDelete() - chapter3')} />
              ))}
            </div>

            <div className="actionsWrapper">
              <Button
                className="addButton"
                variant="outline"
                onClick={() => console.log('교과서 단원(소) 추가')}>
                <LuPlus className="icon" />
                교과서 단원(소)
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const MathChapter2 = memo(_MathChapter2);
export default MathChapter2;
