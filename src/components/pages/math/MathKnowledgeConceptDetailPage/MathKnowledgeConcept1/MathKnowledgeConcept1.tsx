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
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
import useAdjustTextareaHeight from '@/components/hooks/useAdjustTextareaHeight';
// api
import ApiManager from '@/apis/ApiManager';
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
  Textarea,
} from '@/components/shadcn-ui/ui/textarea';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import MathKnowledgeConcept2 from '../MathKnowledgeConcept2/MathKnowledgeConcept2';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
import { 
  flatMathAchievementModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  initialMathKnowledgeConceptPageStoreDetailKC2,
  TMathKnowledgeConceptPageStoreDetailKC2,
} from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore.type';
import { 
  mathKC1AchievementSearchTypeOptions,
} from './MathKnowledgeConcept1.type';
// style
import './MathKnowledgeConcept1.css';

const achievementColumnHelper = createColumnHelper<TMathAchievementFlattenModel>();

function _MathKnowledgeConcept1() {
  //
  // mathKnowledgeConceptPage store
  //
  const detailFormState = useMathKnowledgeConceptPageStore(state => state.detailFormState);
  const {
    title,
    comment,
    kc2_set,
  } = detailFormState;

  const numOfKC2 = kc2_set.length;

  const updateDetailFormState = useMathKnowledgeConceptPageStore(state => state.updateDetailFormState);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // ref
  //
  const indexOfKC2SetRef = useRef<Set<number>>(new Set());
  const searchModalTargetIndexOfKC2Ref = useRef<number | undefined>();

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('kc1');

  //
  // hook
  //
  const {
    isOpenSearchModal,
    onChangeIsOpenSearchModal,
    openSearchModal,
    closeSearchModal,
  } = useSearchModal();

  const {
    adjustTextareaHeight,
  } = useAdjustTextareaHeight();

  //
  // callback
  //
  const openAchievementSearchModal = useCallback((indexOfKC2: number) => {
    searchModalTargetIndexOfKC2Ref.current = indexOfKC2;
    openSearchModal();
  }, [openSearchModal]);

  const onChangeKC2IsChecked = useCallback((params: {
    indexOfKC2: number,
    isChecked: boolean
  }) => {
    const {
      indexOfKC2,
      isChecked,
    } = params;

    const indexOfKC2Set = indexOfKC2SetRef.current;

    if (isChecked) {
      indexOfKC2Set.add(indexOfKC2);
    } else {
      indexOfKC2Set.delete(indexOfKC2);
    }
  }, []);

  const onChangeInput = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const onChangeTextarea = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeInput(e);

    const $textarea = e.target as HTMLTextAreaElement;
    adjustTextareaHeight($textarea);
  }, [onChangeInput, adjustTextareaHeight]);

  const parseFlattenAchievementForDetailFormState = useCallback((
    flattenAchievement: TMathAchievementFlattenModel
  ) => {
    const {
      achievement1,
      achievement2,
      achievement3,
    } = flattenAchievement;

    const {
      no: _no,
      achievement2_set: _achievement2_set,
      ...achievement1Data
    } = achievement1;

    const parsedAchievement3: TMathKnowledgeConceptPageStoreDetailKC2['achievement3'] = {
      id: achievement3.id,
      title: achievement3.title,
      achievement2: {
        id: achievement2.id,
        title: achievement2.title,
        achievement1: {
          ...achievement1Data,
        },
      },
    };

    return parsedAchievement3;
  }, []);

  const onSelectAchievement3 = useCallback((
    flattenAchievement: TMathAchievementFlattenModel
  ) => {
    updateDetailFormState(old => ({
      ...old,
      kc2_set: old.kc2_set?.map((kc2, index) => {
        return index !== searchModalTargetIndexOfKC2Ref.current
          ? kc2
          : {
            ...kc2,
            achievement3: parseFlattenAchievementForDetailFormState(flattenAchievement),
          };
      }) ?? [],
    }));

    searchModalTargetIndexOfKC2Ref.current = undefined;

    setTimeout(() => {
      closeSearchModal();
    });
  }, [
    updateDetailFormState,
    parseFlattenAchievementForDetailFormState,
    closeSearchModal,
  ]);

  const onConfirmDelete = useCallback(() => {
    updateDetailFormState(old => {
      const kc2_set = old.kc2_set?.filter((_kc2, index) => {
        return !indexOfKC2SetRef.current.has(index);
      }) ?? [];

      return {
        ...old,
        kc2_set: kc2_set.length
          ? kc2_set
          : [
            {
              ...initialMathKnowledgeConceptPageStoreDetailKC2,
            },
          ],
      };
    });

    indexOfKC2SetRef.current.clear();
  }, [updateDetailFormState]);

  const onClickDelete = useCallback(() => {
    if (numOfKC2 < 2) {
      openNoticeModal({
        title: '지식개념2 삭제 불가',
        message: '마지막 남은 [지식개념2] 입니다. 더이상 삭제할 수 없습니다.\n최소 [지식개념2] 수량은 1개 입니다.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    if (indexOfKC2SetRef.current.size) {
      openNoticeModal({
        title: '지식개념2 삭제',
        message: '[지식개념2] 를 정말 삭제 하시겠습니까?',
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
      message: '삭제할 지식개념2를 선택해주세요',
      firstButton: {
        text: '확인',
        variant: 'outline',
      },
    });
  }, [
    numOfKC2,
    openNoticeModal, onConfirmDelete,
  ]);

  const addMathKC2 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      kc2_set: [
        ...(old.kc2_set ?? []),
        {
          ...initialMathKnowledgeConceptPageStoreDetailKC2,
        },
      ],
    }));

    indexOfKC2SetRef.current.clear();
  }, [updateDetailFormState]);

  //
  // cache
  //
  const leftSideFormItems = useMemo(() => [
    {
      id: 'kc1__title',
      label: '지식개념1 제목',
      Component: (
        <Input
          id="kc1__title"
          className="editor"
          value={title}
          onChange={onChangeInput} />
      ),
    },
  ], [title, onChangeInput]);

  const rightSideFormItems = useMemo(() => [
    {
      id: 'kc1__comment',
      label: '지식개념 참고',
      Component: (
        <Textarea
          id="kc1__comment"
          className="editor textarea"
          value={comment ?? ''}
          onChange={onChangeTextarea} />
      ),
    },
  ], [comment, onChangeTextarea]);

  const achievementColumns = useMemo(() => [
    achievementColumnHelper.accessor('achievement1.no', {
      header: '성취기준\n(대)순번',
    }),
    achievementColumnHelper.accessor('achievement1.title', {
      header: '성취기준(대)',
    }),
    achievementColumnHelper.accessor('achievement2.no', {
      header: '성취기준\n(중)순번',
    }),
    achievementColumnHelper.accessor('achievement2.title', {
      header: '성취기준(중)',
    }),
    achievementColumnHelper.accessor('achievement3.no', {
      header: '성취기준명\n순번',
    }),
    achievementColumnHelper.accessor('achievement3.title', {
      header: '성취기준명',
    }),
    achievementColumnHelper.display({
      id: 'code',
      header: '표준코드',
      cell: props => {
        const achievement3 = props.row.original.achievement3;

        return achievement3?.code ?? '';
      },
    }),
    achievementColumnHelper.accessor('achievement1.curriculum', {
      header: '교육과정',
    }),
    achievementColumnHelper.accessor('achievement1.classtype', {
      header: '학교급',
    }),
    achievementColumnHelper.accessor('achievement1.grade_cluster', {
      header: '학년(군)',
    }),
  ], []);

  return (<>
    <Accordion 
      className="MathKnowledgeConcept1"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem 
        className="MathKnowledgeConcept1-accordionItem"
        value="kc1">
        <div className="header">
          <div className="actionsWrapper">
            <Button
              className="deleteButton"
              onClick={onClickDelete}>
              삭제
            </Button>
          </div>

          <AccordionTrigger className="title">
            지식개념1
          </AccordionTrigger>
        </div>

        <AccordionContent className="formBody">
          <div className="formBody-leftSide">
            {leftSideFormItems.map(item => {
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

          <div className="formBody-rightSide">
            {rightSideFormItems.map(item => {
              const {
                id,
                label,
                Component
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

    <div className="MathKnowledgeConcept1-kc2Wrapper">
      {detailFormState.kc2_set.map((kc2, indexOfKC2) => {
        return (
          <div 
            key={`${detailFormState.kc2_set?.length}-${indexOfKC2}`}
            className="kc2">
            <MathKnowledgeConcept2
              indexOfKC2={indexOfKC2}
              kc2={kc2}
              onChangeKC2IsChecked={onChangeKC2IsChecked}
              openAchievementSearchModal={openAchievementSearchModal} />
          </div>
        );
      })}
    </div>

    <div className="MathKnowledgeConcept1-actionsWrapper">
      <div className="actionItem">
        <Button
          className="addButton"
          variant="outline"
          onClick={addMathKC2}>
          <LuPlus className="icon" />
          지식개념2
        </Button>
      </div>
    </div>

    <SearchModal
      className="MathKnowledgeConcept1-achievementSearchModal"
      title="성취기준"
      description="적용할 성취기준을 선택해 주세요."
      isOpen={isOpenSearchModal}
      onChangeIsOpen={onChangeIsOpenSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathAchievementsApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathKC1AchievementSearchTypeOptions}
      tableColumns={achievementColumns}
      flatData={flatMathAchievementModel}
      onClickRow={onSelectAchievement3} />
  </>);
}

const MathKnowledgeConcept1 = memo(_MathKnowledgeConcept1);
export default MathKnowledgeConcept1;
