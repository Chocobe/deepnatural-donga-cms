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
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import {
  LuChevronDown,
  LuFileOutput,
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/components/pages/cmsPages.type';
import { 
  cmsClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathQuestionHeaderTextbookSearchTypeOptions,
} from '../../MathQuestionPage/MathQuestionHeader/MathQuestionHeader.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapterHeader.css';

const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();

function _MathChapterHeader() {
  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');
  // TODO: store 구현 후, 적용하기
  const [searchParams, _setSearchParams] = useState({
    textbook: 'All',
  });

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
      id: 'textbook',
      label: '교과서',
      Component: (
        <TBUTooltip 
          key="textbook"
          className="overflow-hidden">
          <SearchModalTrigger
            key="textbook"
            id="textbook"
            className="editor"
            value={searchParams.textbook}
            onOpen={openSearchModal} />
        </TBUTooltip>
      ),
    },
  ], [searchParams, openSearchModal]);

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

  return (<>
    <div className="MathChapterHeader">
      <Accordion
        className="MathChapterHeader-accordion"
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
              교과서 단원 / Filter
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

      <div className="MathChapterHeader-actions">
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
            disabled>
            <LuPlus className="icon" />
            Add 교과서 단원(대)
          </Button>
        </TBUTooltip>
      </div>
    </div>

    <SearchModal
      className="MathChapterHeader-textbookSearchModal"
      isOpen={isOpenSearchModal}
      onChangeIsOpen={onChangeIsOpenSearchModal}
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
        closeSearchModal();
      }} />
  </>);
}

const MathChapterHeader = memo(_MathChapterHeader);
export default MathChapterHeader;
