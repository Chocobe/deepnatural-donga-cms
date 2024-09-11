// TODO: formItems => 2차 배열로 만들기
// TODO: => 그룹 단위 표현을 의도함
// TODO:
// TODO: => => [제품명]
// TODO: => => [학교급, 학년, 학기, 교육과정]
// TODO: => => [과목, 판형, 저자, 발행처]
// TODO: => => [사용기한, 사용범위, 사용권리]
// TODO: => => [사용여부]

// TODO: 차후 `<MathSource />` 구현 시, `max-width` 적용하기
// TODO: => column 최대 4개 까지만

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
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
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
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// type
import { 
  initialMathSeriesSourcePageStoreDetailSource,
} from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore.type';
// style
import './MathSeries.css';

function _MathSeries() {
  //
  // mathSeriesSourcePage store
  //
  const detailFormState = useMathSeriesSourcePageStore(state => state.detailFormState);
  const {
    title,
    source_set,
  } = detailFormState;

  const numOfSource = source_set.length;

  const updateDetailFormState = useMathSeriesSourcePageStore(state => state.updateDetailFormState);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // ref
  //
  const indexOfSourceSetRef = useRef<Set<number>>(new Set());

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('series');

  //
  // callback
  //
  // const onChangeSourceIsChecked = useCallback((params: {
  //   indexOfSource: number,
  //   isChecked: boolean
  // }) => {
  //   const {
  //     indexOfSource,
  //     isChecked,
  //   } = params;

  //   const indexOfSourceSet = indexOfSourceSetRef.current;

  //   if (isChecked) {
  //     indexOfSourceSet.add(indexOfSource);
  //   } else {
  //     indexOfSourceSet.delete(indexOfSource);
  //   }
  // }, []);

  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
      [key]: value,
    }));
  }, [updateDetailFormState]);

  const onConfirmDelete = useCallback(() => {
    updateDetailFormState(old => {
      const source_set = old.source_set?.filter((_source, index) => {
        return !indexOfSourceSetRef.current.has(index);
      }) ?? [];

      return {
        ...old,
        source_set: source_set.length
          ? source_set
          : [
            {
              ...initialMathSeriesSourcePageStoreDetailSource,
            },
          ],
      };
    });

    indexOfSourceSetRef.current.clear();
  }, [updateDetailFormState]);

  const onClickDelete = useCallback(() => {
    if (numOfSource < 2) {
      openNoticeModal({
        title: '출처 삭제 불가',
        message: '마지막 남은 [출처] 입니다. 더이상 삭제할 수 없습니다.\n최소 [출처] 수량은 1개 입니다.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    if (indexOfSourceSetRef.current.size) {
      openNoticeModal({
        title: '출처 삭제',
        message: '[출처] 를 정말 삭제 하시겠습니까?',
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
      message: '삭제할 출처를 선택해주세요',
      firstButton: {
        text: '확인',
        variant: 'outline',
      },
    });
  }, [
    numOfSource,
    openNoticeModal, onConfirmDelete,
  ]);

  const addMathSource = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      source_set: [
        ...(old.source_set ?? []),
        {
          ...initialMathSeriesSourcePageStoreDetailSource,
        },
      ],
    }));

    indexOfSourceSetRef.current.clear();
  }, [updateDetailFormState]);

  //
  // cache
  //
  const formItems = useMemo(() => [
    {
      id: 'series__title',
      label: '시리즈 제목',
      Component: (
        <Input
          id="series__title"
          className="editor"
          value={title}
          onChange={onChangeInput} />
      )
    }
  ], [title, onChangeInput]);

  return (<>
    <Accordion 
      className="MathSeries"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem 
        className="MathSeries-accordionItem"
        value="series">
        <div className="header">
          <div className="actionsWrapper">
            <Button
              className="deleteButton"
              onClick={onClickDelete}>
              삭제
            </Button>
          </div>

          <AccordionTrigger className="title">
            시리즈-출처
          </AccordionTrigger>
        </div>

        <AccordionContent className="formBody">
          <div className="wrapper">
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div className="MathSeries-sourceWrapper">
      {detailFormState.source_set.map((source, indexOfSource) => {
        return (
          <div 
            key={`${detailFormState.source_set?.length}-${indexOfSource}`}
            className="source">
            {/* <MathKnowledgeConcept2
              indexOfKC2={indexOfKC2}
              kc2={kc2}
              onChangeKC2IsChecked={onChangeSourceIsChecked}
              openAchievementSearchModal={openAchievementSearchModal} /> */}
            <div>
              index: ({indexOfSource})
            </div>
          </div>
        );
      })}
    </div>

    <div className="MathSeries-actionsWrapper">
      <div className="actionItem">
        <Button
          className="addButton"
          variant="outline"
          onClick={addMathSource}>
          <LuPlus className="icon" />
          출처
        </Button>
      </div>
    </div>
  </>);
}

const MathSeries = memo(_MathSeries);
export default MathSeries;
