// react
import {
  useState,
  useMemo,
  memo,
} from 'react';
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
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// dayjs
import dayjs from 'dayjs';
// util
import { 
  flatMathSeriesModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  TMathSeriesSourceFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathInstructionHeaderSeriesSearchTypeOptions,
} from './MathInstructionHeader.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathInstructionHeader.css';

const seriesColumnHelper = createColumnHelper<TMathSeriesSourceFlattenModel>();

function _MathInstructionHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const {
    isOpenSearchModal,
    openSearchModal,
    closeSearchModal,
    onChangeIsOpenSearchModal,
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
            value=""
            onOpen={openSearchModal} />
        </TBUTooltip>
      ),
    },
  ], [openSearchModal]);

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
      }
    }),
    seriesColumnHelper.accessor('source.serviceyear', {
      id: 'serviceyear',
      header: '판형',
    }),
    seriesColumnHelper.accessor('source.publisher', {
      id: 'publisher',
      header: '발행처',
    }),
    seriesColumnHelper.accessor('source.expiration_date', {
      id: 'date',
      header: '사용기간',
      cell: props => {
        const expiration_date = props.cell.getValue();

        return dayjs(expiration_date).format('YY년 MM일 DD일');
      },
    }),
    seriesColumnHelper.accessor('source.source_type', {
      id: 'type',
      header: '사용범위',
    }),
    seriesColumnHelper.accessor('source.isview', {
      id: 'isview',
      header: '사용여부',
    }),
  ], []);

  return (<>
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

    <SearchModal
      className="MathInstructionHeader-seriesSearchModal"
      isOpen={isOpenSearchModal}
      onChangeIsOpen={onChangeIsOpenSearchModal}
      title="시리즈-출처"
      description="적용할 시리즈-출처를 선택해 주세요"
      searchTypeOptions={mathInstructionHeaderSeriesSearchTypeOptions}
      retrieveData={ApiManager
        .math
        .retrieveMathSeriesSourcesApi
        .callWithNoticeMessageGroup
      }
      flatData={flatMathSeriesModel}
      tableColumns={seriesTableColumns}
      onClickRow={series => {
        console.log('onClickRow() - series: ', series);
        closeSearchModal();
      }} />
  </>);
}

const MathInstructionHeader = memo(_MathInstructionHeader);
export default MathInstructionHeader;
