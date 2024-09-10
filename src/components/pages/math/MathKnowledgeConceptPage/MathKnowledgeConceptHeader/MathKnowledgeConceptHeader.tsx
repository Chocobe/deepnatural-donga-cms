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
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
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
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import TableEllipsisCell from '@/components/shadcn-ui-custom/TableEllipsisCell/TableEllipsisCell';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  cmsClassTypeFilterOptions,
} from '@/apis/models/cmsCommonModel.type';

import { 
  cmsGradeClusterFilterOptions,
} from '@/apis/models/cmsCommonModel.type';
// util
import { 
  flatMathAchievementModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  mathKnowledgeConceptHeaderAchievementSearchTypeOptions,
} from './MathKnowledgeConceptHeader.type';
import { 
  mathCurriculumFilterOptions,
  TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathKnowledgeConceptHeader.css';


const achievementColumnHelper = createColumnHelper<TMathAchievementFlattenModel>();

function _MathKnowledgeConceptHeader() {
  //
  // mathKnowledgeConceptPage store
  //
  const updateSearchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.updateSearchParamsForRetrieveMathKnowledgeConceptsApi);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  // FIXME: 아직 API 미지원
  const onChangeCurriculum = useCallback((curriculum: string) => {
    console.log('curriculum: ', curriculum);

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
    }));
  }, [updateSearchParamsForRetrieveMathKnowledgeConceptsApi]);

  // FIXME: 아직 API 미지원
  const onChangeClassType = useCallback((classtype: string) => {
    console.log('classtype: ', classtype);

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
    }));
  }, [updateSearchParamsForRetrieveMathKnowledgeConceptsApi]);

  // FIXME: 아직 API 미지원
  const onChangeGradeCluster = useCallback((gradeCluster: string) => {
    console.log('gradeCluster: ', gradeCluster);

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
    }));
  }, [updateSearchParamsForRetrieveMathKnowledgeConceptsApi]);

  const addMathKnowledgeConcept = useCallback(() => {
    navigate(routePathFactory
      .math
      .getKnowledgeConceptAddPage()
    );
  }, [navigate]);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const {
    isOpenSearchModal,
    onChangeIsOpenSearchModal,
    openSearchModal,
    closeSearchModal,
  } = useSearchModal();

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'achievement',
      label: '성취기준',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="achievement"
            className="editor"
            value={''}
            onOpen={openSearchModal} />
        </TBUTooltip>
      ),
    },
    // {
    //   id: 'achievement2',
    //   label: '성취기준(중)',
    //   Component: (
    //     <TBUTooltip className="w-full">
    //       <SearchModalTrigger
    //         id="achievement2"
    //         className="editor"
    //         value={''}
    //         onOpen={() => console.log('achievement2')} />
    //     </TBUTooltip>
    //   ),
    // },
    {
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <TBUTooltip className="w-full">
          <CommonSelect
            id="curriculum"
            className="editor"
            options={mathCurriculumFilterOptions}
            value={''}
            onChange={onChangeCurriculum} />
        </TBUTooltip>
      ),
    },
    {
      id: 'classtype',
      label: '학교급',
      Component: (
        <TBUTooltip className="w-full">
          <CommonSelect
            id="classtype"
            className="editor"
            options={cmsClassTypeFilterOptions}
            value={''}
            onChange={onChangeClassType} />
        </TBUTooltip>
      ),
    },
    {
      id: 'grade_cluster',
      label: '학년(군)',
      Component: (
        <TBUTooltip className="w-full">
          <CommonSelect
            id="grade_cluster"
            className="editor"
            options={cmsGradeClusterFilterOptions['초등']}
            value={''}
            onChange={onChangeGradeCluster} />
        </TBUTooltip>
      ),
    },
  ], [
    openSearchModal,
    onChangeCurriculum,
    onChangeClassType,
    onChangeGradeCluster,
  ]);

  const achievementTableColumns = useMemo(() => [
    achievementColumnHelper.accessor('achievement1.no', {
      id: 'achievement1No',
      header: '성취기준\n(대)순번',
    }),
    achievementColumnHelper.accessor('achievement1.title', {
      id: 'achievement1Title',
      header: '성취기준(대) 제목',
      cell: props => {
        const title = props.getValue();

        return (
          <TableEllipsisCell maxRows={1}>
            {title}
          </TableEllipsisCell>
        );
      },
    }),
    achievementColumnHelper.accessor('achievement2.no', {
      id: 'achievement2No',
      header: '성취기준\n(중)순번',
    }),
    achievementColumnHelper.accessor('achievement2.title', {
      id: 'achievement2Title',
      header: '성취기준(중) 제목',
      cell: props => {
        const title = props.getValue();

        return (
          <TableEllipsisCell maxRows={1}>
            {title}
          </TableEllipsisCell>
        );
      },
    }),
    achievementColumnHelper.accessor('achievement3.no', {
      id: 'achievement3No',
      header: '성취기준\n(소)순번',
    }),
    achievementColumnHelper.accessor('achievement3.title', {
      id: 'achievement3Title',
      header: '성취기준(소) 제목',
      cell: props => {
        const title = props.getValue();

        return (
          <TableEllipsisCell maxRows={1}>
            {title}
          </TableEllipsisCell>
        );
      },
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
      id: 'curriculum',
      header: '교육과정',
    }),
    achievementColumnHelper.accessor('achievement1.classtype', {
      id: 'classtype',
      header: '학교급',
    }),
    achievementColumnHelper.accessor('achievement1.grade_cluster', {
      id: 'cluster',
      header: '학년(군)',
    }),
  ], []);

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

    <SearchModal 
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
      }} />
  </>);
}

const MathKnowledgeConceptHeader = memo(_MathKnowledgeConceptHeader);
export default MathKnowledgeConceptHeader;
