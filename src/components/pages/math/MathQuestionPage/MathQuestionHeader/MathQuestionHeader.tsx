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
// hook
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// api
import ApiManager from '@/apis/ApiManager';
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
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPencil,
} from 'react-icons/lu';
// util
import { 
  flatMathSeriesModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  mathQuestionHeaderSeriesSearchTypeOptions,
  mathQuestionHeaderTextbookSearchTypeOptions,
} from './MathQuestionHeader.type';
import { 
  mathCurriculumFilterOptions,
  TMathSeriesSourceFlattenModel, 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeMapper,
  cmsClassTypeFilterOptions,
  cmsClassTypeOptions,
  cmsGradeFilterOptions,
  cmsGradeOptions,
  cmsTermFilterOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionHeader.css';

const seriesColumnHelper = createColumnHelper<TMathSeriesSourceFlattenModel>();
const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();

function _MathQuestionHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const {
    isOpenSearchModal: isOpenSeriesSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenSeriesSearchModal,
    openSearchModal: openSeriesSearchModal,
    closeSearchModal: closeSeriesSearchModal,
  } = useSearchModal();

  const navigate = useNavigate();

  const {
    isOpenSearchModal: isOpenTextbookSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenTextbookSearchModal,
    openSearchModal: openTextbookSearchModal,
    closeSearchModal: closeTextbookSearchModal,
  } = useSearchModal();

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
            onOpen={openSeriesSearchModal} />
        </TBUTooltip>
      ),
    },
    // FIXME: `시리즈` 단독 검색 API 는 없는 상태
    // {
    //   id: 'source',
    //   label: '출처',
    //   Component: (
    //     <TBUTooltip className="w-full">
    //       <SearchModalTrigger
    //         id="source"
    //         className="editor"
    //         value={''}
    //         onOpen={() => console.log('source')} />
    //     </TBUTooltip>
    //   ),
    // },
    {
      id: 'textbook',
      label: '교과서',
      Component: (
        <TBUTooltip className="w-full">
          <SearchModalTrigger
            id="textbook"
            className="editor"
            value={''}
            onOpen={openTextbookSearchModal} />
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
  ], [
    openSeriesSearchModal,
    openTextbookSearchModal,
  ]);

  const seriesTableColumns = useMemo(() => [
    seriesColumnHelper.accessor('series.title', {
      id: 'title',
      header: '시리즈 제목',
    }),
    seriesColumnHelper.accessor('source.name', {
      id: 'name',
      header: '제품명',
    }),
    seriesColumnHelper.accessor('source.curriculum', {
      id: 'curriculum',
      header: '교육\n과정',
    }),
    seriesColumnHelper.accessor('source.classtype', {
      id: 'classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.cell.getValue();

        return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
          ?? '';
      },
    }),
    seriesColumnHelper.accessor('source.grade', {
      id: 'grade',
      header: '학년',
      cell: props => {
        const classtype = props.row.original.source.classtype;
        const grade = props.cell.getValue();

        if (!classtype || !grade) {
          return '';
        }

        return cmsGradeOptions[classtype].find(({ value }) => Number(value) === grade)?.text
          ?? '';
      },
    }),
    seriesColumnHelper.accessor('source.term', {
      id: 'term',
      header: '학기',
      cell: props => {
        const term = props.cell.getValue();

        return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
          ?? '';
      },
    }),
  ], []);

  const textbookColumns = useMemo(() => [
    textbookColumnHelper.accessor('curriculum', {
      header: '교육과정',
    }),
    textbookColumnHelper.accessor('title', {
      header: '교과서명',
    }),
    textbookColumnHelper.accessor('author', {
      header: '저자',
    }),
    textbookColumnHelper.accessor('classtype', {
      header: '학교급',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsClassTypeOptions.find(({ value }) => value === cell.getValue());
        return valueItem?.text ?? ' ';
      },
    }),
    textbookColumnHelper.accessor('grade', {
      header: '학년',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsGradeOptions[
          cmsClassTypeMapper.ELEMENTARY
        ].find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
    }),
    textbookColumnHelper.accessor('term', {
      header: '학기',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsTermOptions
          .find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
    }),
  ], []);

  //
  // callback
  //
  const addMathQuestion = useCallback(() => {
    navigate(routePathFactory
      .math
      .getQuestionToolPath()
    );
  }, [navigate]);

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
          Import
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

    <SearchModal
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
      }} />

    <SearchModal
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
      }} />
  </>);
}

const MathQuestionHeader = memo(_MathQuestionHeader);
export default MathQuestionHeader;
