// react
import {
  useState,
  useMemo,
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
import './MathKnowledgeConceptHeader.css';

function _MathKnowledgeConceptHeader() {
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
            onChange={() => console.log('교육과정')} />
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
            onChange={() => console.log('학교급')} />
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
            onChange={() => console.log('학년(군)')} />
        </TBUTooltip>
      ),
    },
  ], []);

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
