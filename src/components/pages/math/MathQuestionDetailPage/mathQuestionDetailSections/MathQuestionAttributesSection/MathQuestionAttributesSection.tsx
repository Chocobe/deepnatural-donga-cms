// react
import {
  useRef,
  useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useHandleMathQuestionDetailEditors from '../hooks/useHandleMathQuestionDetailEditors';
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import MathQuestionMathJaxEditor from '../MathQuestionMathJaxEditor/MathQuestionMathJaxEditor';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// import { 
//   Button,
// } from '@/components/shadcn-ui/ui/button';
// import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
// import { 
//   LuPlus,
// } from 'react-icons/lu';
// util
import { 
  flatMathAchievementModel,
  flatMathKnowledgeConceptModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  mathBehaviorDomainOptions,
  TMathAchievementFlattenModel,
  TMathKnowledgeConceptFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsDifficultyOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathAchievementSearchTypeOptions,
} from '../../../MathAchievementPage/MathAchievementTableActions/MathAchievementTableActions.type';
import { 
  mathKnowledgeConceptSearchTypeOptions,
} from '../../../MathKnowledgeConceptPage/MathKnowledgeConceptTableActions/MathKnowledgeConceptTableActions.type';
// style
import './MathQuestionAttributesSection.css';

const achievementColumnHelper = createColumnHelper<TMathAchievementFlattenModel>();
const kcColumnHelper = createColumnHelper<TMathKnowledgeConceptFlattenModel>();

function _MathQuestionAttributesSection() {
  //
  // mathQuestionPage store
  //
  const source_page_no = useMathQuestionPageStore(state => state.detailFormState.source_page_no);
  const source_question_no = useMathQuestionPageStore(state => state.detailFormState.source_question_no);
  const behavior_domain = useMathQuestionPageStore(state => state.detailFormState.behavior_domain);
  const difficulty = useMathQuestionPageStore(state => state.detailFormState.difficulty);
  const keyword = useMathQuestionPageStore(state => state.detailFormState.keyword);
  const achievement = useMathQuestionPageStore(state => state.detailFormState.achievement);
  const kc2 = useMathQuestionPageStore(state => state.detailFormState.kc2);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // ref
  //
  const indexOfAchievementRef = useRef<number | null>(null);

  //
  // hook
  //
  const {
    onChangeInput,
    onChangeSelect,
  } = useHandleMathQuestionDetailEditors();

  const {
    isOpenSearchModal: isOpenAchievementSearchModal,
    closeSearchModal: closeAchievementSearchModal,
    openSearchModal: openAchievementSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenAchievementSearchModal,
  } = useSearchModal();

  const {
    isOpenSearchModal: isOpenKCSearchModal,
    closeSearchModal: closeKCSearchModal,
    openSearchModal: openKCSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenKCSearchModal,
  } = useSearchModal();

  //
  // callback
  //
  const _openAchievementSearchModal = useCallback((
    indexOfAchievement: number
  ) => {
    indexOfAchievementRef.current = indexOfAchievement;
    openAchievementSearchModal();
  }, [openAchievementSearchModal]);

  const _closeAchievementSearchModal = useCallback(() => {
    indexOfAchievementRef.current = null;
    closeAchievementSearchModal();
  }, [closeAchievementSearchModal]);

  // FIXME: 미사용 처리 - 성취기준은 Array 타입이지만, 1개만 사용하는 것으로 논의됨
  // const addAchievement = useCallback(() => {
  //   updateDetailFormState(old => {
  //     const achievement = old.achievement ?? [];

  //     const lastAchievement = achievement[achievement.length - 1] ?? null;
  //     const isInvalid = lastAchievement === null;

  //     const newDetailFormState = {
  //       ...old,
  //       achievement: isInvalid
  //         ? old.achievement
  //         : [
  //           ...(old.achievement ?? []),
  //           null
  //         ],
  //     };

  //     if (!isInvalid) {
  //       _openAchievementSearchModal(newDetailFormState.achievement!.length - 1);
  //     }

  //     return newDetailFormState;
  //   });
  // }, [
  //   updateDetailFormState,
  //   _openAchievementSearchModal,
  // ]);

  // FIXME: 미사용 처리 - 성취기준은 Array 타입이지만, 1개만 사용하는 것으로 논의됨
  // const deleteAchievement = useCallback((indexOfAchievement: number) => {
  //   updateDetailFormState(old => {
  //     const achievement = [...(old.achievement ?? [])];
  //     achievement.splice(indexOfAchievement, 1);

  //     if (!achievement.length) {
  //       achievement.push(null);
  //     }

  //     return {
  //       ...old,
  //       achievement,
  //     };
  //   });
  // }, [updateDetailFormState]);

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: '출처 페이지',
      id: 'source_page_no',
      components: [
        {
          Editor: (
            <Input
              id="source_page_no"
              value={source_page_no}
              onChange={onChangeInput} />
          ),
        },
      ],
    },
    {
      label: '출처 문항 번호',
      id: 'source_question_no',
      components: [
        {
          Editor: (
            <Input
              id="source_question_no"
              value={source_question_no}
              onChange={onChangeInput} />
          ),
        },
      ],
    },
    {
      label: '행동영역',
      id: 'behavior_domain',
      components: [
        {
          Editor: (
            <CommonSelect
              id="behavior_domain"
              value={behavior_domain}
              options={mathBehaviorDomainOptions}
              onChange={onChangeSelect} />
          ),
        },
      ],
    },
    {
      label: '난이도',
      id: 'difficulty',
      components: [
        {
          Editor: (
            <CommonSelect
              id="difficulty"
              value={String(difficulty)}
              options={cmsDifficultyOptions}
              onChange={onChangeSelect} />
          ),
        },
      ],
    },
    {
      label: '키워드',
      id: 'keyword',
      fluid: true,
      components: [
        {
          Editor: (
            <MathQuestionMathJaxEditor
              id="keyword"
              value={keyword}
              onChange={onChangeInput} />
          ),
        },
      ],
    },
    {
      label: '성취기준',
      id: 'achievement',
      components: Array.from(
        { length: Math.max(achievement.length, 1) },
        (_, indexOfAchievement) => {
          return {
            Editor: (
              <SearchModalTrigger
                id="achievement"
                onOpen={() => _openAchievementSearchModal(indexOfAchievement)}
                value={achievement?.[indexOfAchievement]?.title ?? ''}
                isShowSearchIcon />
            ),
            // FIXME: 미사용 처리 - 성취기준은 Array 타입이지만, 1개만 사용하는 것으로 논의됨
            // Actions: [
            //   (
            //     <Button onClick={() => deleteAchievement(indexOfAchievement)}>
            //       삭제
            //     </Button>
            //   ),
            //   indexOfAchievement === (achievement.length - 1)
            //     ? (
            //       <TBUTooltip>
            //         <Button onClick={addAchievement}>
            //           <LuPlus className="ml-1 w-4 h-4" />
            //           성취기준 추가하기
            //         </Button>
            //       </TBUTooltip>
            //     ): null
            // ],
          };
        }
      ),
    },
    {
      label: '지식개념',
      id: 'kc2',
      components: [
        {
          Editor: (
            <SearchModalTrigger
              id="kc2"
              onOpen={openKCSearchModal}
              value={kc2?.title ?? ''}
              isShowSearchIcon />
          ),
        },
      ],
    },
    {
      label: '지식개념1 제목',
      id: 'kc1_title',
      components: [
        {
          Editor: (
            <Input
              id="kc1_title"
              value={kc2?.kc1?.title ?? ''}
              isReadOnly />
          ),
        },
      ],
    },
    {
      label: '지식개념2 제목',
      id: 'kc2_title',
      components: [
        {
          Editor: (
            <Input
              id="kc2_title"
              value={kc2?.title ?? ''}
              isReadOnly />
          ),
        },
      ],
    },
  ], [
    source_page_no,
    source_question_no,
    behavior_domain,
    difficulty,
    keyword,
    achievement,
    kc2,
    onChangeInput,
    onChangeSelect,
    _openAchievementSearchModal,
    openKCSearchModal,
    // FIXME: 미사용 처리 - 성취기준은 Array 타입이지만, 1개만 사용하는 것으로 논의됨
    // addAchievement,
    // deleteAchievement,
  ]);

  const achievementColumns = useMemo(() => [
    achievementColumnHelper.accessor('achievement1.curriculum', {
      id: 'achievementSearchModal_curriculum',
      header: '교육과정',
    }),
    achievementColumnHelper.accessor('achievement1.classtype', {
      id: 'achievementSearchModal_classtype',
      header: '학교급',
    }),
    achievementColumnHelper.accessor('achievement1.grade_cluster', {
      id: 'achievementSearchModal_grade_cluster',
      header: '학년(군)',
    }),
    achievementColumnHelper.accessor('achievement1.no', {
      id: 'achievementSearchModal_achievement1_no',
      header: '성취기준\n(대)순번',
    }),
    achievementColumnHelper.accessor('achievement1.title', {
      id: 'achievementSearchModal_achievement1_title',
      header: '성취기준(대)',
    }),
    achievementColumnHelper.accessor('achievement2.no', {
      id: 'achievementSearchModal_achievement2_no',
      header: '성취기준\n(중)순번',
    }),
    achievementColumnHelper.accessor('achievement2.title', {
      id: 'achievementSearchModal_achievement2_title',
      header: '성취기준(중)',
    }),
    achievementColumnHelper.accessor('achievement3.no', {
      id: 'achievementSearchModal_achievement3_no',
      header: '성취기준명\n순번',
    }),
    achievementColumnHelper.accessor('achievement3.title', {
      id: 'achievementSearchModal_achievement3_title',
      header: '성취기준명',
    }),
    achievementColumnHelper.display({
      id: 'achievementSearchModal_code',
      header: '표준코드',
      cell: props => {
        const achievement3 = props.row.original.achievement3;

        return achievement3?.code ?? '';
      },
    }),
  ], []);

  const kcColumns = useMemo(() => [
    kcColumnHelper.display({
      id: 'kcSearchModal_curriculum',
      header: '교육과정',
      cell: props => {
        const curriculum = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .curriculum;

        return curriculum;
      },
    }),
    kcColumnHelper.display({
      id: 'kcSearchModal_classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .classtype;

        return classtype;
      },
    }),
    kcColumnHelper.display({
      id: 'kcSearchModal_grade_cluster',
      header: '학년(군)',
      cell: props => {
        const gradeCluster = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .grade_cluster;

        return gradeCluster;
      },
    }),
    kcColumnHelper.display({
      id: 'kcSearchModal_achievement1_title',
      header: '성취기준(대)',
      cell: props => {
        const achievement1Title = props.row.original
          .kc1
          .achievement3
          .achievement2
          .achievement1
          .title;

        return achievement1Title;
      },
    }),
    kcColumnHelper.display({
      id: 'kcSearchModal_achievement2_title',
      header: '성취기준(중)',
      cell: props => {
        const achievement2Title = props.row.original
          .kc1
          .achievement3
          .achievement2
          .title;

        return achievement2Title;
      },
    }),
    kcColumnHelper.display({
      id: 'kcSearchModal_achievement3_title',
      header: '성취기준명',
      cell: props => {
        const achievement3Title = props.row.original
          .kc1
          .achievement3
          .title;

        return achievement3Title;
      },
    }),
    kcColumnHelper.accessor('kc1.title', {
      id: 'kcSearchModal_kc1_title',
      header: 'KC1',
    }),
    kcColumnHelper.accessor('kc2.title', {
      id: 'kcSearchModal_kc2_title',
      header: 'KC2',
    }),
  ], []);

  //
  // callback
  //
  const onSelectAchievement3 = useCallback((
    newAchievement: TMathAchievementFlattenModel
  ) => {
    const indexOfAchievement = indexOfAchievementRef.current;

    if (indexOfAchievement === null) {
      return;
    }

    updateDetailFormState(old => {
      const achievement = [...(old.achievement ?? [])];
      achievement.splice(
        indexOfAchievement,
        1,
        newAchievement.achievement3
      );

      return {
        ...old,
        achievement,
      };
    });

    _closeAchievementSearchModal();
  }, [
    updateDetailFormState,
    _closeAchievementSearchModal,
  ]);

  const onSelectKC = useCallback((
    kc: TMathKnowledgeConceptFlattenModel
  ) => {
    updateDetailFormState(old => ({
      ...old,
      kc2: {
        id: kc.kc2.id,
        title: kc.kc2.title,
        comment: kc.kc2.comment,
        kc1: kc.kc1
          ? {
            id: kc.kc1.id,
            title: kc.kc1.title,
            comment: kc.kc1.comment,
          }: null,
      },
    }));

    closeKCSearchModal();
  }, [
    updateDetailFormState,
    closeKCSearchModal,
  ]);

  return (<>
    <MathQuestionDetailSectionTemplate title="문항속성">
      {sectionItems.map((item, index) => {
        const {
          id,
          label,
          components,
          fluid,
          isHide,
        } = item;

        return (
          <MathQuestionDetailSectionItemTemplate
            key={id ?? index}
            id={id}
            label={label}
            components={components}
            fluid={fluid}
            isHide={isHide} />
        );
      })}
    </MathQuestionDetailSectionTemplate>

    <SearchModal
      className="MathQuestionAttributesSection-achievementSearchModal"
      title="성취기준"
      description="적용할 성취기준을 선택해 주세요."
      isOpen={isOpenAchievementSearchModal}
      onChangeIsOpen={onChangeIsOpenAchievementSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathAchievementsApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathAchievementSearchTypeOptions}
      tableColumns={achievementColumns}
      flatData={flatMathAchievementModel}
      onClickRow={onSelectAchievement3} />

    <SearchModal
      className="MathQuestionAttributesSection-kcSearchModal"
      title="지식개념"
      description="적용할 지식개념을 선택해 주세요."
      isOpen={isOpenKCSearchModal}
      onChangeIsOpen={onChangeIsOpenKCSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathKnowledgeConceptsApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathKnowledgeConceptSearchTypeOptions}
      tableColumns={kcColumns}
      flatData={flatMathKnowledgeConceptModel}
      onClickRow={onSelectKC} />
  </>);
}

const MathQuestionAttributesSection = memo(_MathQuestionAttributesSection);
export default MathQuestionAttributesSection;
