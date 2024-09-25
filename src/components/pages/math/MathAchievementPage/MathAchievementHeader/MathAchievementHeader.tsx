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
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  mathCurriculumFilterOptions,
} from '@/apis/models/mathModel.type';
import {
  cmsClassTypeFilterOptions,
  cmsGradeClusterFilterOptions,
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
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
  const {
    classtype,
    curriculum,
    grade_cluster,
  } = searchParamsForRetrieveMathAchievementsApi;

  const updateSearchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.updateSearchParamsForRetrieveMathAchievementsApi);

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

  const onChangeClassType = useCallback((classtype: string) => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => {
      const correctedClasstype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathAchievementsApiRequestParams = {
        searchParams: {
          ...old,
          classtype: correctedClasstype,
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

  const onChangeSelect = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    const correctedValue = value?.trim()?.length
      ? value
      : undefined;

    updateSearchParamsForRetrieveMathAchievementsApi(old => {
      const params: TRetrieveMathAchievementsApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
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
    {
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeSelect} />
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
          value={classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'grade_cluster',
      label: '학년(군)',
      Component: (
        <CommonSelect
          id="grade_cluster"
          className="editor"
          options={classtype
            ? cmsGradeClusterFilterOptions[classtype]
            : cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={grade_cluster ?? cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeSelect} />
      ),
    },
  ], [
    curriculum,
    classtype,
    grade_cluster,
    onChangeSelect,
    onChangeClassType,
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
