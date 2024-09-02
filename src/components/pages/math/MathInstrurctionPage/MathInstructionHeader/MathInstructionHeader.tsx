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
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathInstructionHeader.css';

function _MathInstructionHeader() {
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
            value=""
            onOpen={() => console.log('시리즈 검색 모달 열기')} />
        </TBUTooltip>
      ),
    },
  ], []);

  return (
    <div className="MathInstructionHeader">
      <Accordion
        className="MathInstructionHeader-accordion"
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
              지문 / Filter
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

      <div className="MathInstructionHeader-actions">
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
            onClick={() => console.log('Add 지문')}
            disabled>
            <LuPlus className="icon" />
            Add 지문
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathInstructionHeader = memo(_MathInstructionHeader);
export default MathInstructionHeader;
