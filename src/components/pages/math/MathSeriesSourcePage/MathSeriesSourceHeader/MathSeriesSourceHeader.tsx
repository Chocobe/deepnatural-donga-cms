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
  cmsGradeFilterOptions,
  cmsTermFilterOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumFilterOptions,
} from '@/apis/models/mathModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathSeriesSourceHeader.css';

function _MathSeriesSourceHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // cache
  //
  const filterItems = useMemo(() => [
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

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const addMathSeriesSource = useCallback(() => {
    navigate(routePathFactory
      .math
      .getSeriesSourceAddPage()
    );
  }, [navigate]);

  return (
    <div className="MathSeriesSourceHeader">
      <Accordion
        className="MathSeriesSourceHeader-accordion"
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
              시리즈-출처 / Filter
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

      <div className="MathSeriesSourceHeader-actions">
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
            onClick={addMathSeriesSource}>
            <LuPlus className="icon" />
            Add 시리즈
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathSeriesSourceHeader = memo(_MathSeriesSourceHeader);
export default MathSeriesSourceHeader;
