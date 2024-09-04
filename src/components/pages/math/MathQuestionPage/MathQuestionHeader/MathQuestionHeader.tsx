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
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPencil,
} from 'react-icons/lu';
// type
import { 
  mathCurriculumFilterOptions,
} from '../../mathPages.type';
import { 
  cmsClassTypeFilterOptions,
  cmsGradeFilterOptions,
  cmsTermFilterOptions,
} from '@/components/pages/cmsPages.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionHeader.css';

function _MathQuestionHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'series',
      label: '시리즈',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="series"
            className="editor"
            value={''}
            onOpen={() => console.log('series')} />
        </TBUTooltip>
      ),
    },
    {
      id: 'source',
      label: '출처',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="source"
            className="editor"
            value={''}
            onOpen={() => console.log('source')} />
        </TBUTooltip>
      ),
    },
    {
      id: 'textbook',
      label: '교과서',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="textbook"
            className="editor"
            value={''}
            onOpen={() => console.log('textbook')} />
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
            value={' '}
            onChange={() => console.log('curriculum')} />
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
            value={' '}
            onChange={() => console.log('classtype')} />
        </TBUTooltip>
      ),
    },
    {
      id: 'grade',
      label: '학년',
      Component: (
        <TBUTooltip className="w-full">
          <CommonSelect
            id="grade"
            className="editor"
            options={cmsGradeFilterOptions['초등']}
            value={' '}
            onChange={() => console.log('grade')} />
        </TBUTooltip>
      ),
    },
    {
      id: 'term',
      label: '학기',
      Component: (
        <TBUTooltip className="w-full">
          <CommonSelect
            id="term"
            className="editor"
            options={cmsTermFilterOptions}
            value={' '}
            onChange={() => console.log('term')} />
        </TBUTooltip>
      ),
    },
  ], []);

  return (
    <div className="MathQuestionHeader">
      <Accordion
        className="MathQuestionHeader-accordion"
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
              문항 / Filter
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

      <div className="MathQuestionHeader-actions">
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
            onClick={() => console.log('Add 시리즈')}
            disabled>
            <LuPencil className="icon" />
            신규문항 등록도구
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathQuestionHeader = memo(_MathQuestionHeader);
export default MathQuestionHeader;
