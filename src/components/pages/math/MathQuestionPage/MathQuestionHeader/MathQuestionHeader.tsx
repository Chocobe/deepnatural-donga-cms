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
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
// FIXME: KC 검색 모달 구현하기
// import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// api
// FIXME: KC 검색 모달 구현하기
// import ApiManager from '@/apis/ApiManager';
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
// FIXME: KC 검색 모달 구현하기
// import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
// import { 
//   createColumnHelper,
// } from '@tanstack/react-table';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPencil,
} from 'react-icons/lu';
// util
// FIXME: KC 검색 모달 구현하기
// import { 
//   flatMathSeriesModel,
// } from '@/utils/flatModels/flatMathModels';
// type
// FIXME: KC 검색 모달 구현하기
// import { 
//   mathQuestionHeaderSeriesSearchTypeOptions,
//   mathQuestionHeaderTextbookSearchTypeOptions,
// } from './MathQuestionHeader.type';
import { 
  mathCurriculumFilterOptions,
  // FIXME: KC 검색 모달 구현하기
  // TMathSeriesSourceFlattenModel, 
  // TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeFilterOptions,
  cmsGradeFilterOptions,
  cmsTermFilterOptions,
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
  // FIXME: KC 검색 모달 구현하기
  // cmsClassTypeMapper,
  // cmsClassTypeOptions,
  // cmsGradeOptions,
  // cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TRetrieveMathQuestionsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionHeader.css';

// FIXME: KC 검색 모달 구현하기
// const seriesColumnHelper = createColumnHelper<TMathSeriesSourceFlattenModel>();
// const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();

type TMathQuestionHeaderProps = {
  retrieveMathQuestions: (params: TRetrieveMathQuestionsApiRequestParams) => Promise<void>;
};

function _MathQuestionHeader(props: TMathQuestionHeaderProps) {
  const {
    retrieveMathQuestions,
  } = props;

  //
  // mathQuestionPage store
  //
  const searchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.searchParamsForRetrieveMathQuestionsApi);
  const {
    curriculum,
    source_classtype,
    source_grade,
    source_term,
  } = searchParamsForRetrieveMathQuestionsApi;

  const updateSearchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.updateSearchParamsForRetrieveMathQuestionsApi);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  // FIXME: KC 검색 모달 구현하기
  // const {
  //   isOpenSearchModal: isOpenSeriesSearchModal,
  //   onChangeIsOpenSearchModal: onChangeIsOpenSeriesSearchModal,
  //   openSearchModal: openSeriesSearchModal,
  //   closeSearchModal: closeSeriesSearchModal,
  // } = useSearchModal();

  const navigate = useNavigate();

  //
  // callback
  //
  const addMathQuestion = useCallback(() => {
    navigate(routePathFactory
      .math
      .getQuestionToolPath()
    );
  }, [navigate]);

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

    updateSearchParamsForRetrieveMathQuestionsApi(old => {
      const params: TRetrieveMathQuestionsApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathQuestions(params);

      return params.searchParams;
    });
  }, [
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  const onChangeClassType = useCallback((classtype: string) => {
    updateSearchParamsForRetrieveMathQuestionsApi(old => {
      const source_classtype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathQuestionsApiRequestParams = {
        searchParams: {
          ...old,
          source_classtype,
          source_grade: undefined,
        },
      };

      retrieveMathQuestions(params);

      return params.searchParams;
    });
  }, [
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  // FIXME: KC 검색 모달 구현하기
  // const {
  //   isOpenSearchModal: isOpenTextbookSearchModal,
  //   onChangeIsOpenSearchModal: onChangeIsOpenTextbookSearchModal,
  //   openSearchModal: openTextbookSearchModal,
  //   closeSearchModal: closeTextbookSearchModal,
  // } = useSearchModal();

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
          value={curriculum ?? SELECT_OPTION_ITEM_ALL.value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'source_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="source_classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={source_classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'source_grade',
      label: '학년',
      Component: (
        <CommonSelect
          id="source_grade"
          className="editor"
          options={source_classtype
            ? cmsGradeFilterOptions[source_classtype]
            : cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={source_grade ?? cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'source_term',
      label: '학기',
      Component: (
        <CommonSelect
          id="source_term"
          className="editor"
          options={cmsTermFilterOptions}
          value={source_term ?? cmsTermFilterOptions[0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'kc',
      label: 'KC',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="kc"
            className=""
            onOpen={() => console.log('open KC Modal')}
            value="" />
        </TBUTooltip>
      ),
    },
  ], [
    curriculum,
    source_classtype,
    source_grade,
    source_term,
    onChangeSelect,
    onChangeClassType,
    // FIXME: KC 검색 모달 구현하기
    // openSeriesSearchModal,
    // openTextbookSearchModal,
  ]);

  // FIXME: KC 검색 모달 구현하기
  // const seriesTableColumns = useMemo(() => [
  //   seriesColumnHelper.accessor('series.title', {
  //     id: 'title',
  //     header: '시리즈 제목',
  //   }),
  //   seriesColumnHelper.accessor('source.name', {
  //     id: 'name',
  //     header: '제품명',
  //   }),
  //   seriesColumnHelper.accessor('source.curriculum', {
  //     id: 'curriculum',
  //     header: '교육\n과정',
  //   }),
  //   seriesColumnHelper.accessor('source.classtype', {
  //     id: 'classtype',
  //     header: '학교급',
  //     cell: props => {
  //       const classtype = props.cell.getValue();

  //       return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
  //         ?? '';
  //     },
  //   }),
  //   seriesColumnHelper.accessor('source.grade', {
  //     id: 'grade',
  //     header: '학년',
  //     cell: props => {
  //       const classtype = props.row.original.source.classtype;
  //       const grade = props.cell.getValue();

  //       if (!classtype || !grade) {
  //         return '';
  //       }

  //       return cmsGradeOptions[classtype].find(({ value }) => Number(value) === grade)?.text
  //         ?? '';
  //     },
  //   }),
  //   seriesColumnHelper.accessor('source.term', {
  //     id: 'term',
  //     header: '학기',
  //     cell: props => {
  //       const term = props.cell.getValue();

  //       return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
  //         ?? '';
  //     },
  //   }),
  // ], []);

  // FIXME: KC 검색 모달 구현하기
  // const textbookColumns = useMemo(() => [
  //   textbookColumnHelper.accessor('curriculum', {
  //     header: '교육과정',
  //   }),
  //   textbookColumnHelper.accessor('title', {
  //     header: '교과서명',
  //   }),
  //   textbookColumnHelper.accessor('author', {
  //     header: '저자',
  //   }),
  //   textbookColumnHelper.accessor('classtype', {
  //     header: '학교급',
  //     cell: props => {
  //       const {
  //         cell,
  //       } = props;

  //       const valueItem = cmsClassTypeOptions.find(({ value }) => value === cell.getValue());
  //       return valueItem?.text ?? ' ';
  //     },
  //   }),
  //   textbookColumnHelper.accessor('grade', {
  //     header: '학년',
  //     cell: props => {
  //       const {
  //         cell,
  //       } = props;

  //       const valueItem = cmsGradeOptions[
  //         cmsClassTypeMapper.ELEMENTARY
  //       ].find(({ value }) => value === String(cell.getValue()));

  //       return valueItem?.text ?? ' ';
  //     },
  //   }),
  //   textbookColumnHelper.accessor('term', {
  //     header: '학기',
  //     cell: props => {
  //       const {
  //         cell,
  //       } = props;

  //       const valueItem = cmsTermOptions
  //         .find(({ value }) => value === String(cell.getValue()));

  //       return valueItem?.text ?? ' ';
  //     },
  //   }),
  // ], []);

  return (<>
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
        <Button
          className="actionButton"
          disabled>
          <LuFileOutput className="icon" />
          업로드
        </Button>

        <TBUTooltip>
          <Button
            className="actionButton"
            onClick={addMathQuestion}>
            <LuPencil className="icon" />
            신규문항 등록도구
          </Button>
        </TBUTooltip>
      </div>
    </div>

    {/* FIXME: KC 검색 모달 구현하기 */}
    {/* <SearchModal
      className="MathQuestionHeader-seriesSearchModal"
      isOpen={isOpenSeriesSearchModal}
      onChangeIsOpen={onChangeIsOpenSeriesSearchModal}
      title="시리즈-출처 검색"
      description="적용할 시리즈-출처를 선택해 주세요."
      searchTypeOptions={mathQuestionHeaderSeriesSearchTypeOptions}
      retrieveData={ApiManager
        .math
        .retrieveMathSeriesSourcesApi
        .callWithNoticeMessageGroup
      }
      flatData={flatMathSeriesModel}
      tableColumns={seriesTableColumns}
      onClickRow={series => {
        console.log('onClickRow() - series: ', series);
        closeSeriesSearchModal();
      }} /> */}

    {/* FIXME: KC 검색 모달 구현하기 */}
    {/* <SearchModal
      className="MathQuestionHeader-textbookSearchModal"
      isOpen={isOpenTextbookSearchModal}
      onChangeIsOpen={onChangeIsOpenTextbookSearchModal}
      title="교과서 검색"
      description="적용할 교과서를 선택해 주세요."
      searchTypeOptions={mathQuestionHeaderTextbookSearchTypeOptions}
      retrieveData={ApiManager
        .math
        .retrieveMathTextbooksApi
        .callWithNoticeMessageGroup
      }
      tableColumns={textbookColumns}
      onClickRow={textbook => {
        console.log('onClickRow() - textbook: ', textbook);
        closeTextbookSearchModal();
      }} /> */}
  </>);
}

const MathQuestionHeader = memo(_MathQuestionHeader);
export default MathQuestionHeader;
