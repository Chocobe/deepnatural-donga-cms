// react
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
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
// type
import { 
  initialMathChapterPageStoreDetailChapter3,
  TMathChapterPageStoreDetailChapter2,
} from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore.type';
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
  const numOfChapter2 = useMathChapterPageStore(state => state.detailFormState.chapter2_set.length);

  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // ref
  //
  const indexOfChapter3SetRef = useRef<Set<number>>(new Set());

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

  const onChangeChapter3IsChecked = useCallback((params: {
    indexOfChapter3: number;
    isChecked: boolean;
  }) => {
    const {
      indexOfChapter3,
      isChecked,
    } = params;

    const indexOfChapter3Set = indexOfChapter3SetRef.current;

    if (isChecked) {
      indexOfChapter3Set.add(indexOfChapter3);
    } else {
      indexOfChapter3Set.delete(indexOfChapter3);
    }
  }, []);

  const onConfirmDelete = useCallback(() => {
    if (isChecked) {
      updateDetailFormState(old => ({
        ...old,
        chapter2_set: old.chapter2_set?.filter((_oldChapter2, index) => {
          return index !== indexOfChapter2;
        }),
      }));

      return;
    }

    const indexOfChapter3Set = indexOfChapter3SetRef.current;

    if (!indexOfChapter3Set.size) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      chapter2_set: old.chapter2_set?.map((chapter2, index) => {
        return index !== indexOfChapter2
          ? chapter2
          : {
            ...chapter2,
            chapter3_set: chapter2.chapter3_set.filter((_chapter3, index) => {
              return !indexOfChapter3Set.has(index);
            }),
          };
      }) ?? [],
    }));

    indexOfChapter3Set.clear();
  }, [
    isChecked, indexOfChapter2, 
    updateDetailFormState,
  ]);

  const onClickDelete = useCallback(() => {
    if (isChecked) {
      if (numOfChapter2 < 2) {
        openNoticeModal({
          title: '중단원 삭제 불가',
          message: '마지막 남은 [중단원] 입니다. 더이상 삭제할 수 없습니다.\n최소 [중단원] 수량은 1개 입니다.',
          firstButton: {
            text: '확인',
            variant: 'outline',
          },
        });

        return;
      }

      openNoticeModal({
        title: '중단원 삭제',
        message: `[중단원]을 삭제할 경우 [하위 소단원]도 같이 삭제됩니다.\n정말 삭제 하시겠습니까?`,
        firstButton: {
          text: '취소',
          variant: 'outline',
        },
        secondButton: {
          text: '삭제',
          variant: 'destructive',
          onClick: onConfirmDelete,
        },
      });

      return;
    }

    if (indexOfChapter3SetRef.current.size) {
      openNoticeModal({
        title: '소단원 삭제',
        message: '소단원을 정말 삭제 하시겠습니까?',
        firstButton: {
          text: '취소',
          variant: 'outline',
        },
        secondButton: {
          text: '삭제',
          variant: 'destructive',
          onClick: onConfirmDelete,
        },
      });

      return;
    }

    openNoticeModal({
      title: '',
      message: '삭제할 중단원 또는 소단원을 선택해주세요',
      firstButton: {
        text: '확인',
        variant: 'outline',
      },
    });
  }, [
    isChecked, numOfChapter2,
    openNoticeModal, onConfirmDelete,
  ]);

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

  const addMathChapter3 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      chapter2_set: old.chapter2_set?.map((chapter2, index) => {
        return index !== indexOfChapter2
          ? chapter2
          : {
            ...chapter2,
            chapter3_set: [
              ...chapter2.chapter3_set,
              {
                ...initialMathChapterPageStoreDetailChapter3,
              },
            ],
          };
      }) ?? [],
    }));

    indexOfChapter3SetRef.current.clear();
  }, [indexOfChapter2, updateDetailFormState]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfChapter2}-chapter2__no`,
      label: '순번',
      Component: (
        <Input
          id={`${indexOfChapter2}-chapter2__no`}
          className="editor"
          value={no}
          onChange={onChangeChapter2}
        />
      ),
    },
    {
      id: `${indexOfChapter2}-chapter2__title`,
      label: '중단원 제목',
      Component: (
        <Input
          id={`${indexOfChapter2}-chapter2__title`}
          className="editor"
          value={title}
          onChange={onChangeChapter2}
        />
      ),
    },
  ], [
    indexOfChapter2, no, title,
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
            {!!chapter2.chapter3_set.length && (
              <div className="list">
                {chapter2.chapter3_set.map((chapter3, indexOfChapter3) => (
                  <MathChapter3
                    key={`${chapter2.chapter3_set.length}-${indexOfChapter3}`}
                    indexOfChapter2={indexOfChapter2}
                    indexOfChapter3={indexOfChapter3}
                    chapter3={chapter3}
                    onChangeChapter3IsChecked={onChangeChapter3IsChecked} />
                ))}
              </div>
            )}

            <div className="actionsWrapper">
              <Button
                className="addButton"
                variant="outline"
                onClick={addMathChapter3}>
                <LuPlus className="icon" />
                소단원 추가
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
