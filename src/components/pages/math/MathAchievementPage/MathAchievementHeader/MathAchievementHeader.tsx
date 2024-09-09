// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
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
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  cmsClassTypeFilterOptions,
} from '@/components/pages/cmsPages.type';
import { 
  mathCurriculumFilterOptions,
  mathGradeClusterFilterOptions,
} from '../../mathPages.type';
import { 
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TMathCurriculum,
} from '@/apis/models/mathModel.type';
import {
  TCMSClassType,
  TCMSGradeCluster,
} from '@/apis/models/cmsCommonModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathAchievementHeader.css';

type TMathAchievementHeaderProps = {
  retrieveMathAchievements: (params: TRetrieveMathAchievementsApiRequestParams) => Promise<void>;
};

function _MathAchievementHeader(props: TMathAchievementHeaderProps) {
  const {
    retrieveMathAchievements,
  } = props;

  //
  // mathAchievementPage store
  //
  const searchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.searchParamsForRetrieveMathAchievementsApi);

  const updateSearchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.updateSearchParamsForRetrieveMathAchievementsApi);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const navigate = useNavigate();

  // FIXME: mockup
  // const [searchParams, setSearchParams] = useState({
  //   achievement2: '',
  //   achievement3: '',
  //   classtype: ' ',
  //   curriculum: ' ',
  //   gradeCluster: ' ',
  // });

  //
  // callback
  //
  // const openAchievement2SearchModal = useCallback(() => {
  //   console.log('openAchievement2SearchModal()');
  // }, []);

  // const openAchievement3SearchModal = useCallback(() => {
  //   console.log('openAchievement3SearchModal()');
  // }, []);

  const onChangeCurriculum = useCallback((curriculum: string) => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => {
      const _curriculum = curriculum.trim().length
        ? curriculum as TMathCurriculum
        : undefined;

      const params: TRetrieveMathAchievementsApiRequestParams = {
        searchParams: {
          ...old,
          curriculum: _curriculum,
        },
      };

      retrieveMathAchievements(params);

      return params.searchParams;
    });
  }, [
    retrieveMathAchievements,
    updateSearchParamsForRetrieveMathAchievementsApi
  ]);

  const onChangeClassType = useCallback((classtype: string) => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => {
      const _classtype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathAchievementsApiRequestParams = {
        searchParams: {
          ...old,
          classtype: _classtype,
          grade_cluster: undefined,
        },
      };

      retrieveMathAchievements(params);

      return params.searchParams;
    });
  }, [
    retrieveMathAchievements,
    updateSearchParamsForRetrieveMathAchievementsApi,
  ]);

  const onChangeGradeCluster = useCallback((gradeCluster: string) => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => {
      const _gradeCluster = gradeCluster.trim().length
        ? gradeCluster as TCMSGradeCluster
        : undefined;

      const params: TRetrieveMathAchievementsApiRequestParams = {
        searchParams: {
          ...old,
          grade_cluster: _gradeCluster,
        },
      };

      retrieveMathAchievements(params);

      return params.searchParams;
    });
  }, [
    retrieveMathAchievements,
    updateSearchParamsForRetrieveMathAchievementsApi,
  ]);

  const addMathAchievement = useCallback(() => {
    navigate(routePathFactory
      .math
      .getAchievementAddPath()
    );
  }, [navigate]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    // FIXME: 사용여부 논의 필요
    // {
    //   id: 'achievement2',
    //   label: '성취기준(중)',
    //   Component: (
    //     <TBUTooltip 
    //       key="achievement2"
    //       className="w-full">
    //       <SearchModalTrigger
    //         key="achievement2"
    //         id="achievement2"
    //         className="editor"
    //         value={searchParamsForRetrieveMathAchievementsApi.achievement2 ?? ''}
    //         onOpen={openAchievement2SearchModal} />
    //     </TBUTooltip>
    //   ),
    // },
    // {
    //   id: 'achievement3',
    //   label: '성취기준(소)',
    //   Component: (
    //     <TBUTooltip 
    //       key="achievement3" 
    //       className="w-full">
    //       <SearchModalTrigger
    //         key="achievement3"
    //         id="achievement3"
    //         className="editor"
    //         value={searchParamsForRetrieveMathAchievementsApi.achievement3 ?? ''}
    //         onOpen={openAchievement3SearchModal} />
    //     </TBUTooltip>
    //   ),
    // },
    {
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={searchParamsForRetrieveMathAchievementsApi.curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeCurriculum} />
      ),
    },
    {
      id: 'classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={searchParamsForRetrieveMathAchievementsApi.classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'gradeCluster',
      label: '학년(군)',
      Component: (
        <CommonSelect
          id="gradeCluster"
          className="editor"
          options={searchParamsForRetrieveMathAchievementsApi.classtype
            ? mathGradeClusterFilterOptions[searchParamsForRetrieveMathAchievementsApi.classtype]
            : mathGradeClusterFilterOptions[mathGradeClusterFilterOptions[' '][0].value]
          }
          value={searchParamsForRetrieveMathAchievementsApi.grade_cluster ?? mathGradeClusterFilterOptions[' '][0].value}
          onChange={onChangeGradeCluster} />
      ),
    },
  ], [
    searchParamsForRetrieveMathAchievementsApi, 
    // openAchievement2SearchModal,
    // openAchievement3SearchModal,
    onChangeCurriculum,
    onChangeClassType,
    onChangeGradeCluster,
  ]);

  return (
    <div className="MathAchievementHeader">
      <Accordion
        className="MathAchievementHeader-accordion"
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
              성취기준 / Filter
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

      <div className="MathAchievementHeader-actions">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileOutput className="icon" />
            Import
          </Button>
        </TBUTooltip>

        <Button
          className="actionButton"
          onClick={addMathAchievement}>
          <LuPlus className="icon" />
          Add 성취기준(대)
        </Button>
      </div>
    </div>
  );
}

const MathAchievementHeader = memo(_MathAchievementHeader);
export default MathAchievementHeader;
