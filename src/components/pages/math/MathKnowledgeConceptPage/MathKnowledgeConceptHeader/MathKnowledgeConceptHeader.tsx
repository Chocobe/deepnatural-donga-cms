// react
import {
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
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
import './MathKnowledgeConceptHeader.css';

function _MathKnowledgeConceptHeader() {
  //
  // mathKnowledgeConceptPage store
  //
  const updateSearchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.updateSearchParamsForRetrieveMathKnowledgeConceptsApi);

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

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'achievement1',
      label: '성취기준(대)',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="achievement1"
            className="editor"
            value={''}
            onOpen={() => console.log('achievement1')} />
        </TBUTooltip>
      ),
    },
    {
      id: 'achievement2',
      label: '성취기준(중)',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="achievement2"
            className="editor"
            value={''}
            onOpen={() => console.log('achievement2')} />
        </TBUTooltip>
      ),
    },
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
            options={mathGradeClusterFilterOptions['초등']}
            value={''}
            onChange={onChangeGradeCluster} />
        </TBUTooltip>
      ),
    },
  ], [
    onChangeCurriculum,
    onChangeClassType,
    onChangeGradeCluster,
  ]);

  return (
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
            onClick={() => console.log('Add 지식개념')}
            disabled>
            <LuPlus className="icon" />
            Add 지식개념
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathKnowledgeConceptHeader = memo(_MathKnowledgeConceptHeader);
export default MathKnowledgeConceptHeader;
