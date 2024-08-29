// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
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
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathAchievementHeader.css';

function _MathAchievementHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  // FIXME: mockup
  const [searchParams, setSearchParams] = useState({
    achievement2: '',
    achievement3: '',
    classtype: ' ',
    curriculum: ' ',
    gradeCluster: ' ',
  });

  //
  // callback
  //
  const openAchievement2SearchModal = useCallback(() => {
    console.log('openAchievement2SearchModal()');
  }, []);

  const openAchievement3SearchModal = useCallback(() => {
    console.log('openAchievement3SearchModal()');
  }, []);

  const onChangeCurriculum = useCallback((curriculum: string) => {
    setSearchParams(old => ({
      ...old,
      curriculum,
    }));
  }, []);

  const onChangeClassType = useCallback((classtype: string) => {
    console.log('onChangeClassType - classtype: ', `(${classtype})`);
    setSearchParams(old => ({
      ...old,
      classtype,
      gradeCluster: mathGradeClusterFilterOptions[' '][0].value,
    }));
  }, []);

  const onChangeGradeCluster = useCallback((gradeCluster: string) => {
    console.log('onChangeGradeCluster - gradeCluster: ', `(${gradeCluster})`);
    setSearchParams(old => ({
      ...old,
      gradeCluster,
    }));
  }, []);

  const addMathAchievement = useCallback(() => {
    console.log('addMathAchievement()');
  }, []);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'achievement2',
      label: '성취기준(중)',
      Component: (
        <TBUTooltip 
          key="achievement2"
          className="w-full">
          <SearchModalTrigger
            key="achievement2"
            id="achievement2"
            className="editor"
            value={searchParams.achievement2}
            onOpen={openAchievement2SearchModal} />
        </TBUTooltip>
      ),
    },
    {
      id: 'achievement3',
      label: '성취기준(소)',
      Component: (
        <TBUTooltip 
          key="achievement3" 
          className="w-full">
          <SearchModalTrigger
            key="achievement3"
            id="achievement3"
            className="editor"
            value={searchParams.achievement3}
            onOpen={openAchievement3SearchModal} />
        </TBUTooltip>
      ),
    },
    {
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <TBUTooltip key="curriculum" className="w-full">
          <CommonSelect
            id="curriculum"
            className="editor"
            options={mathCurriculumFilterOptions}
            value={searchParams.curriculum}
            onChange={onChangeCurriculum} />
        </TBUTooltip>
      ),
    },
    {
      id: 'classtype',
      label: '학교급',
      Component: (
        <TBUTooltip 
          key="curriculum" 
          className="w-full">
          <CommonSelect
            id="classtype"
            className="editor"
            options={cmsClassTypeFilterOptions}
            value={searchParams.classtype}
            onChange={onChangeClassType} />
        </TBUTooltip>
      ),
    },
    {
      id: 'gradeCluster',
      label: '학년(군)',
      Component: (
        <TBUTooltip
          key="gradeCluster"
          className="w-full">
          <CommonSelect
            id="gradeCluster"
            className="editor"
            options={searchParams.classtype
              ? mathGradeClusterFilterOptions[searchParams.classtype]
              : mathGradeClusterFilterOptions[mathGradeClusterFilterOptions[' '][0].value]
            }
            value={searchParams.gradeCluster}
            onChange={onChangeGradeCluster} />
        </TBUTooltip>
      )
    }
  ], [
    searchParams, 
    openAchievement2SearchModal,
    openAchievement3SearchModal,
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

        <TBUTooltip>
          <Button
            className="actionButton"
            onClick={addMathAchievement}
            disabled>
            <LuPlus className="icon" />
            Add 성취기준(대)
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathAchievementHeader = memo(_MathAchievementHeader);
export default MathAchievementHeader;
