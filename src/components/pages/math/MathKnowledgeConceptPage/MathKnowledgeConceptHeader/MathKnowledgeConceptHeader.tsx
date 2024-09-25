// react
import {
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// hook
// FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
// import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// // api
// import ApiManager from '@/apis/ApiManager';
// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn-ui/ui/accordion';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
// import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
// import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
// import TableEllipsisCell from '@/components/shadcn-ui-custom/TableEllipsisCell/TableEllipsisCell';
// import { 
//   createColumnHelper,
// } from '@tanstack/react-table';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  cmsClassTypeFilterOptions,
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
} from '@/apis/models/cmsCommonModel.type';
import { 
  cmsGradeClusterFilterOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  mathCurriculumFilterOptions,

  // FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
  // TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';
// FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
// import { 
//   mathKnowledgeConceptHeaderAchievementSearchTypeOptions,
// } from './MathKnowledgeConceptHeader.type';
// util
// import { 
//   flatMathAchievementModel,
// } from '@/utils/flatModels/flatMathModels';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathKnowledgeConceptHeader.css';

// FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
// const achievementColumnHelper = createColumnHelper<TMathAchievementFlattenModel>();

type TMathKnowledgeConceptHeaderProps = {
  retrieveMathKnowledgeConcepts: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => Promise<void>;
};

function _MathKnowledgeConceptHeader(props: TMathKnowledgeConceptHeaderProps) {
  const {
    retrieveMathKnowledgeConcepts,
  } = props;

  //
  // mathKnowledgeConceptPage store
  //
  const searchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.searchParamsForRetrieveMathKnowledgeConceptsApi);
  const {
    achievement1_classtype,
    achievement1_curriculum,
    achievement1_grade_cluster,
  } = searchParamsForRetrieveMathKnowledgeConceptsApi;

  const updateSearchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.updateSearchParamsForRetrieveMathKnowledgeConceptsApi);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const onChangeSelect = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => {
      const correctedValue = value?.trim()?.length
        ? value
        : undefined;
  
      const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathKnowledgeConcepts(params);

      return params.searchParams;
    });
  }, [
    retrieveMathKnowledgeConcepts,
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi,
  ]);

  const onChangeClassType = useCallback((
    classtype: string
  ) => {
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => {
      const achievement1_classtype = classtype?.trim()?.length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
        searchParams: {
          ...old,
          achievement1_classtype,
          achievement1_grade_cluster: undefined,
        },
      };

      retrieveMathKnowledgeConcepts(params);

      return params.searchParams;
    });
  }, [
    retrieveMathKnowledgeConcepts,
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi,
  ]);

  const addMathKnowledgeConcept = useCallback(() => {
    navigate(routePathFactory
      .math
      .getKnowledgeConceptAddPage()
    );
  }, [navigate]);

  //
  // hook
  //
  // FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
  // const {
  //   isOpenSearchModal,
  //   onChangeIsOpenSearchModal,
  //   openSearchModal,
  //   closeSearchModal,
  // } = useSearchModal();

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'achievement1_curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="achievement1_curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={achievement1_curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'achievement1_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="achievement1_classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={achievement1_classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'achievement1_grade_cluster',
      label: '학년(군)',
      Component: (
        <CommonSelect
          id="achievement1_grade_cluster"
          className="editor"
          options={achievement1_classtype
            ? cmsGradeClusterFilterOptions[achievement1_classtype]
            : cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={achievement1_grade_cluster ?? cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeSelect} />
      ),
    },
    // FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
    // {
    //   id: 'achievement',
    //   label: '성취기준',
    //   Component: (
    //     <TBUTooltip className="w-full">
    //       <SearchModalTrigger
    //         id="achievement"
    //         className="editor"
    //         value={''}
    //         onOpen={openSearchModal} />
    //     </TBUTooltip>
    //   ),
    // },
  ], [
    achievement1_curriculum,
    achievement1_classtype,
    achievement1_grade_cluster,
    onChangeSelect,
    onChangeClassType,
    // FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
    // openSearchModal,
  ]);

  // FIXME: `성취기준 검색 모달` 확정 시, 주석 해제
  // const achievementTableColumns = useMemo(() => [
  //   achievementColumnHelper.accessor('achievement1.no', {
  //     id: 'achievement1No',
  //     header: '성취기준\n(대)순번',
  //   }),
  //   achievementColumnHelper.accessor('achievement1.title', {
  //     id: 'achievement1Title',
  //     header: '성취기준(대) 제목',
  //     cell: props => {
  //       const title = props.getValue();

  //       return (
  //         <TableEllipsisCell maxRows={1}>
  //           {title}
  //         </TableEllipsisCell>
  //       );
  //     },
  //   }),
  //   achievementColumnHelper.accessor('achievement2.no', {
  //     id: 'achievement2No',
  //     header: '성취기준\n(중)순번',
  //   }),
  //   achievementColumnHelper.accessor('achievement2.title', {
  //     id: 'achievement2Title',
  //     header: '성취기준(중) 제목',
  //     cell: props => {
  //       const title = props.getValue();

  //       return (
  //         <TableEllipsisCell maxRows={1}>
  //           {title}
  //         </TableEllipsisCell>
  //       );
  //     },
  //   }),
  //   achievementColumnHelper.accessor('achievement3.no', {
  //     id: 'achievement3No',
  //     header: '성취기준\n(소)순번',
  //   }),
  //   achievementColumnHelper.accessor('achievement3.title', {
  //     id: 'achievement3Title',
  //     header: '성취기준(소) 제목',
  //     cell: props => {
  //       const title = props.getValue();

  //       return (
  //         <TableEllipsisCell maxRows={1}>
  //           {title}
  //         </TableEllipsisCell>
  //       );
  //     },
  //   }),
  //   achievementColumnHelper.display({
  //     id: 'code',
  //     header: '표준코드',
  //     cell: props => {
  //       const achievement3 = props.row.original.achievement3;

  //       return achievement3?.code ?? '';
  //     },
  //   }),
  //   achievementColumnHelper.accessor('achievement1.curriculum', {
  //     id: 'curriculum',
  //     header: '교육과정',
  //   }),
  //   achievementColumnHelper.accessor('achievement1.classtype', {
  //     id: 'classtype',
  //     header: '학교급',
  //   }),
  //   achievementColumnHelper.accessor('achievement1.grade_cluster', {
  //     id: 'cluster',
  //     header: '학년(군)',
  //   }),
  // ], []);

  return (<>
    <div className="MathKnowledgeConceptHeader">
      <Accordion
        className="MathKnowledgeConceptHeader-accordion"
        type="single"
        value={accordionValue}
        onValueChange={setAccordionValue}
        collapsible>
        <AccordionItem
          className="border-0"
          value="filters">
          <AccordionTrigger
            className="trigger"
            isHideChevronIcon>
            <div className="title">
              지식개념 / Filter
              <LuChevronDown className={cn(
                'icon',
                accordionValue ? 'open' : 'close'
              )} />
            </div>
          </AccordionTrigger>

          <AccordionContent className="filters">
            {filterItems.map(item => {
              const {
                id,
                label,
                Component,
              } = item;

              return (
                <div 
                  key={id}
                  className="filterItem">
                  <Label
                    htmlFor={id}
                    className="label">
                    {label}
                  </Label>

                  {Component}
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="MathKnowledgeConceptHeader-actions">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileOutput className="icon" />
            Import
          </Button>
        </TBUTooltip>

        <TBUTooltip>
          <Button
            className="actionButton"
            onClick={addMathKnowledgeConcept}>
            <LuPlus className="icon" />
            Add 지식개념
          </Button>
        </TBUTooltip>
      </div>
    </div>

    {/* FIXME: `성취기준 검색 모달` 확정 시, 주석 해제 */}
    {/* <SearchModal 
      className="MathKnowledgeConceptHeader-achievementSearchModal"
      isOpen={isOpenSearchModal}
      onChangeIsOpen={onChangeIsOpenSearchModal}
      title="성취기준"
      description="적용할 성취기준을 선택해 주세요."
      searchTypeOptions={mathKnowledgeConceptHeaderAchievementSearchTypeOptions}
      retrieveData={ApiManager
        .math
        .retrieveMathAchievementsApi
        .callWithNoticeMessageGroup
      }
      flatData={flatMathAchievementModel}
      tableColumns={achievementTableColumns}
      onClickRow={achievement => {
        console.log('onClickRow() - achievement: ', achievement);
        closeSearchModal();
      }} /> */}
  </>);
}

const MathKnowledgeConceptHeader = memo(_MathKnowledgeConceptHeader);
export default MathKnowledgeConceptHeader;
