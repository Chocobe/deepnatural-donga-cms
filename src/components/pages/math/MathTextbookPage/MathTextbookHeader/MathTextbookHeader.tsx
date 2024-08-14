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
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// types
import { 
  textbookClassificationFilterOptions,
  textbookClassTypeFilterOptions,
  textbookGradeFilterOptions,
  textbookTermFilterOptions,
} from './MathTextbookHeader.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathTextbookHeader.css';

function _MathTextbookHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  const [filterState, setFilterState] = useState<{
    classType: string;
    grade: string;
    term: string;
    classification: string;
  }>({
    // 학교급
    classType: textbookClassTypeFilterOptions[0].value,
    // 학년
    grade: textbookGradeFilterOptions[
      textbookClassTypeFilterOptions[0].value
    ][0].value,
    // 학기
    term: textbookTermFilterOptions[0].value,
    // 분류
    classification: textbookClassificationFilterOptions[0].value,
  });

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const onChangeClassType = useCallback((classType: string) => {
    setFilterState({
      classType,
      grade: textbookGradeFilterOptions[classType][0].value,
      term: textbookTermFilterOptions[0].value,
      classification: textbookClassificationFilterOptions[0].value,
    });
  }, []);

  const onChangeGrade = useCallback((grade: string) => {
    setFilterState(filterState => ({
      ...filterState,
      grade,
    }));
  }, []);

  const onChangeTerm = useCallback((term: string) => {
    setFilterState(filterState => ({
      ...filterState,
      term,
    }));
  }, []);

  const onChangeClassification = useCallback((classification: string) => {
    setFilterState(filterState => ({
      ...filterState,
      classification,
    }));
  }, []);

  const addMathTextbook = useCallback(() => {
    navigate(routePathFactory
      .math
      .getTextbookAddPath()
    );
  }, [navigate]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'classType',
      label: '학교급',
      options: textbookClassTypeFilterOptions,
      value: filterState.classType,
      onChange: onChangeClassType,
    },
    {
      id: 'grade',
      label: '학년',
      options: textbookGradeFilterOptions[filterState.classType],
      value: filterState.grade,
      onChange: onChangeGrade,
    },
    {
      iid: 'term',
      label: '학기',
      options: textbookTermFilterOptions,
      value: filterState.term,
      onChange: onChangeTerm,
    },
    {
      id: 'classification',
      label: '분류',
      options: textbookClassificationFilterOptions,
      value: filterState.classification,
      onChange: onChangeClassification,
    },
  ], [
    filterState,
    onChangeClassType, onChangeGrade, onChangeTerm,
    onChangeClassification,
  ]);

  return (
    <div className="MathTextbookHeader">
      <Accordion
        className="MathTextbookHeader-accordion"
        type="single" 
        value={accordionValue}
        onValueChange={setAccordionValue}
        collapsible>
        <AccordionItem className="border-0" value="filters">
          <AccordionTrigger className="trigger">
            <div className="title">
              교과서 / Filter
              <LuChevronDown 
                className={cn(
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
                options,
                value,
                onChange,
              } = item;

              return (
                <div
                  key={label}
                  className="filterItem">
                  <Label
                    htmlFor={id}
                    className="label">
                    {label}
                  </Label>

                  <Select
                    value={value}
                    onValueChange={onChange}>
                    <SelectTrigger
                      id={id}
                      className="select">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {options.map(option => {
                        const {
                          text,
                          value,
                        } = option;

                        return (
                          <SelectItem
                            key={value}
                            value={value}>
                            {text}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="MathTextbookHeader-actions">
        <Button
          className="actionButton">
          <LuFileOutput className="icon" />
          Import
        </Button>

        <Button
          className="actionButton"
          onClick={addMathTextbook}>
          <LuPlus className="icon" />
          Add 교과서
        </Button>
      </div>
    </div>
  );
}

const MathTextbookHeader = memo(_MathTextbookHeader);
export default MathTextbookHeader;
