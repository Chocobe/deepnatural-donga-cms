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
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
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
  cmsTermFilterOptions,
  cmsGradeFilterOptions,
  cmsClassTypeFilterOptions,
  TCMSClassType,
  TCMSElementaryGrade,
  TCMSTerm,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TRetrieveMathTextbooksApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  mathCurriculumFilterOptions, 
  TMathCurriculum,
} from '@/apis/models/mathModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathTextbookHeader.css';

type TMathTextbookHeaderProps = {
  retrieveMathTextbooks: (params: TRetrieveMathTextbooksApiRequestParams) => Promise<void>;
};

function _MathTextbookHeader(props: TMathTextbookHeaderProps) {
  const {
    retrieveMathTextbooks,
  } = props;

  //
  // mathTextbookPage store
  //
  const searchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.searchParamsForRetrieveMathTextbooksApi);

  const updateSearchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.updateSearchParamsForRetrieveMathTextbooksApi);

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
  const onChangeClassType = useCallback((classType: string) => {
    const classtype = classType.trim().length
      ? classType as TCMSClassType
      : undefined;

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
        classtype,
        grade: undefined,
      },
    };

    retrieveMathTextbooks(params);
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      classtype,
      grade: undefined,
    }));
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    updateSearchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
  ]);

  const onChangeCurriculum = useCallback((curriculum: string) => {
    const _curriculum = curriculum.trim().length
      ? curriculum as TMathCurriculum
      : undefined;

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
        curriculum: _curriculum,
      },
    };

    retrieveMathTextbooks(params);
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      curriculum: _curriculum,
    }));
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks, 
    updateSearchParamsForRetrieveMathTextbooksApi,
  ]);

  const onChangeGrade = useCallback((grade: string) => {
    const _grade = grade.trim().length
      ? Number(grade) as TCMSElementaryGrade
      : undefined;

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
        grade: _grade,
      },
    };

    retrieveMathTextbooks(params);
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      grade: _grade,
    }));
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
    updateSearchParamsForRetrieveMathTextbooksApi,
  ]);

  const onChangeTerm = useCallback((term: string) => {
    const _term = term.trim().length
      ? Number(term) as TCMSTerm
      : undefined;

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
        term: _term,
      },
    };

    retrieveMathTextbooks(params);
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      term: _term,
    }));
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
    updateSearchParamsForRetrieveMathTextbooksApi,
  ]);

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
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="curriculum"
          options={mathCurriculumFilterOptions}
          value={searchParamsForRetrieveMathTextbooksApi.curriculum ??
            mathCurriculumFilterOptions[0].value
          }
          onChange={onChangeCurriculum}
        />
      )
    },
    {
      id: 'classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="classtype"
          options={cmsClassTypeFilterOptions}
          value={searchParamsForRetrieveMathTextbooksApi.classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'grade',
      label: '학년',
      Component: (
        <CommonSelect
          id="grade"
          options={searchParamsForRetrieveMathTextbooksApi.classtype
            ? cmsGradeFilterOptions[searchParamsForRetrieveMathTextbooksApi.classtype]
            : cmsGradeFilterOptions[' ']
          }
          value={String(
            searchParamsForRetrieveMathTextbooksApi.grade ?? 
            cmsGradeFilterOptions[' '][0].value
          )}
          onChange={e => {
            console.log('e: ', `(${e})`);
            onChangeGrade(e);
          }} />
      ),
    },
    {
      id: 'term',
      label: '학기',
      Component: (
        <CommonSelect
          id="term"
          options={cmsTermFilterOptions}
          value={String(
            searchParamsForRetrieveMathTextbooksApi.term ?? 
            cmsTermFilterOptions[0].value
          )}
          onChange={onChangeTerm} />
      ),
    },
  ], [
    searchParamsForRetrieveMathTextbooksApi,
    onChangeCurriculum,
    onChangeClassType, 
    onChangeGrade, 
    onChangeTerm,
  ]);

  return (
    <div className="MathTextbookHeader">
      <Accordion
        className="MathTextbookHeader-accordion"
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

      <div className="MathTextbookHeader-actions">
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
