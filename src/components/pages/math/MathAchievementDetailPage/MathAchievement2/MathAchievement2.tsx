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
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
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
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// type
import { 
  initialMathAchievementPageStoreDetailAchievement3,
  TMathAchievementPageStoreDetailAchievement2,
} from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathAchievement2.css';

type TMathAchievement2Props = {
  indexOfAchievement2: number;
  achievement2: TMathAchievementPageStoreDetailAchievement2;
};

function _MathAchievement2(props: TMathAchievement2Props) {
  const {
    indexOfAchievement2,
    achievement2,
  } = props;

  const {
    no,
    title,
    achievement3_set,
  } = achievement2;

  const numOfAchievement3 = achievement3_set?.length ?? 0;

  //
  // mathAchievementPage store
  //
  const numOfAchievement2 = useMathAchievementPageStore(state => state.detailFormState.achievement2_set.length);

  const updateDetailFormState = useMathAchievementPageStore(state => state.updateDetailFormState);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // ref
  //
  const indexOfAchievement3SetRef = useRef<Set<number>>(new Set());

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('achievement2');
  const [isChecked, setIsChecked] = useState(false);

  //
  // callback
  //
  const onChangeIsChecked = useCallback(() => {
    setIsChecked(isChecked => !isChecked);
  }, []);

  // FIXME: `<MathAchieve3 />` 구현후, 주석해제
  // const onChangeAchievement3IsChecked = useCallback((params: {
  //   indexOfAchievement3: number;
  //   isChecked: boolean;
  // }) => {
  //   const {
  //     indexOfAchievement3,
  //     isChecked,
  //   } = params;

  //   const indexOfAchievement3Set = indexOfAchievement3SetRef.current;

  //   if (isChecked) {
  //     indexOfAchievement3Set.add(indexOfAchievement3);
  //   } else {
  //     indexOfAchievement3Set.delete(indexOfAchievement3);
  //   }
  // }, []);

  const onConfirmDelete = useCallback(() => {
    if (isChecked) {
      updateDetailFormState(old => ({
        ...old,
        achievement2_set: old.achievement2_set?.filter((_oldAchievement2, index) => {
          return index !== indexOfAchievement2;
        }),
      }));

      return;
    }

    const indexOfAchievement3Set = indexOfAchievement3SetRef.current;

    if (!indexOfAchievement3Set.size) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      achievement2_set: old.achievement2_set?.map((achievement2, index) => {
        return index !== indexOfAchievement2
          ? achievement2
          : {
            ...achievement2,
            achievement3_set: achievement2.achievement3_set.filter((_chapter3, index) => {
              return !indexOfAchievement3Set.has(index);
            }),
          };
      }) ?? [],
    }));

    indexOfAchievement3Set.clear();
  }, [
    isChecked, indexOfAchievement2, 
    updateDetailFormState,
  ]);

  const onClickDelete = useCallback(() => {
    if (isChecked) {
      if (numOfAchievement2 < 2) {
        openNoticeModal({
          title: '성취기준(중) 삭제 불가',
          message: '마지막 남은 [성취기준(중)] 입니다. 더이상 삭제할 수 없습니다.\n최소 [성취기준(중)] 수량은 1개 입니다.',
          firstButton: {
            text: '확인',
            variant: 'outline',
          },
        });

        return;
      }

      openNoticeModal({
        title: '성취기준(중) 삭제',
        message: `[성취기준(중)]을 삭제할 경우 [성취기준(소)]도 같이 삭제됩니다.\n정말 삭제 하시겠습니까?`,
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

    if (indexOfAchievement3SetRef.current.size) {
      if (numOfAchievement3 < 2) {
        openNoticeModal({
          title: '성취기준(소) 삭제 불가',
          message: '마지막 남은 [성취기준(소)] 입니다. 더이상 삭제할 수 없습니다.\n최소 [성취기준(소)] 수량은 1개 입니다.',
          firstButton: {
            text: '확인',
            variant: 'outline',
          },
        });

        return;
      }

      openNoticeModal({
        title: '성취기준(소) 삭제',
        message: '성취기준(소)를 정말 삭제 하시겠습니까?',
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
      message: '삭제할 성취기준(중) 또는 성취기준(소)를 선택해주세요',
      firstButton: {
        text: '확인',
        variant: 'outline',
      },
    });
  }, [
    isChecked, numOfAchievement2, numOfAchievement3,
    openNoticeModal, onConfirmDelete,
  ]);

  const onChangeAchievement2 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
      achievement2_set: old.achievement2_set?.map((oldAchievement2, index) => {
        return index !== indexOfAchievement2
          ? oldAchievement2
          : {
            ...oldAchievement2,
            [key]: value,
          };
      }),
    }));
  }, [indexOfAchievement2, updateDetailFormState]);

  const addMathAchievement3 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      achievement2_set: old.achievement2_set?.map((achievement2, index) => {
        return index !== indexOfAchievement2
          ? achievement2
          : {
            ...achievement2,
            achievement3_set: [
              ...achievement2.achievement3_set,
              {
                ...initialMathAchievementPageStoreDetailAchievement3,
              },
            ],
          };
      }) ?? [],
    }));

    indexOfAchievement3SetRef.current.clear();
  }, [indexOfAchievement2, updateDetailFormState]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: `${indexOfAchievement2}-achievement2__no`,
      label: '순번',
      Component: (
        <Input
          id={`${indexOfAchievement2}-chapter2__no`}
          className="editor"
          value={no}
          onChange={onChangeAchievement2}
        />
      ),
    },
    {
      id: `${indexOfAchievement2}-achievement2__title`,
      label: '성취기준(중) 제목',
      Component: (
        <Input
          id={`${indexOfAchievement2}-achievement2__title`}
          className="editor"
          value={title}
          onChange={onChangeAchievement2}
        />
      ),
    },
  ], [
    indexOfAchievement2, no, title,
    onChangeAchievement2,
  ]);

  return (
    <Accordion
      className="MathAchievement2"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem
        className="MathAchievement2-accordionItem"
        value="achievement2">
        <div className="header">
          <div className="actionsWrapper">
            <div className="notice">
              {indexOfAchievement2 === 0
                ? '* 성취기준(중)은 최소 1개 이상 이어야 합니다.'
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
            성취기준(중)
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

          <div className="achievement3Wrapper">
            {!!achievement2.achievement3_set.length && (
              <div className="list">
                {achievement2.achievement3_set.map((achievement3, indexOfAchievement3) => (
                  // FIXME: `<MathAchieve3 />` 구현후, 주석해제
                  // <MathAchievement3
                  //   key={`${achievement2.achievement3_set.length}-${indexOfAchievement3}`}
                  //   indexOfChapter2={indexOfAchievement2}
                  //   indexOfChapter3={indexOfAchievement3}
                  //   achievement3={achievement3}
                  //   onChangeAchievement3IsChecked={onChangeAchievement3IsChecked} />
                  <div key={`${achievement2.achievement3_set.length}-${indexOfAchievement3}`}>
                    <div>
                      {achievement3.title} (indexOfAchievement3: {indexOfAchievement3})
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="actionsWrapper">
              <Button
                className="addButton"
                variant="outline"
                onClick={addMathAchievement3}>
                <LuPlus className="icon" />
                성취기준(소)
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const MathAchievement2 = memo(_MathAchievement2);
export default MathAchievement2;
