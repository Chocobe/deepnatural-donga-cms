// react
import {
  useState,
  useMemo,
  memo,
  useCallback,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
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
  Input,
} from '@/components/shadcn-ui/ui/input';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// icon
import { 
  LuChevronDown,
} from 'react-icons/lu';
// type
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/components/pages/cmsPages.type';
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  mathChapter1TextbookSearchTypeOptions,
} from './MathChapter1.type';
import { 
  cmsClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapter1.css';
import MathChapter2 from '../MathChapter2/MathChapter2';

const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();

function _MathChapter1() {
  //
  // mathChapterPage store
  //
  const detailFormState = useMathChapterPageStore(state => state.detailFormState);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState<string>('chapter1');

  //
  // hook
  //
  const {
    isOpenSearchModal,
    onChangeIsOpenSearchModal,
    openSearchModal,
    closeSearchModal,
  } = useSearchModal();

  //
  // callback
  //
  const onClickTextbook = useCallback((textbook: TMathTextbookModel) => {
    console.log('onClickTextbook() - textbook: ', textbook);
    closeSearchModal();
  }, [closeSearchModal]);

  //
  // cache
  //
  const leftSideFormItems = useMemo(() => [
    {
      id: 'no',
      label: '순번',
      Component: (
        <Input
          id="no"
          className="editor" />
      ),
    },
    {
      id: 'title',
      label: '대단원 제목',
      Component: (
        <Input
          id="title"
          className="editor" />
      ),
    },
  ], []);

  const rightSideFormItems = useMemo(() => [
    {
      id: 'classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="classtype"
          className="editor"
          placeholder="선택해주세요"
          options={cmsClassTypeOptions}
          value=""
          onChange={() => console.log('학교급')} />
      ),
    },
    {
      id: 'grade',
      label: '학년',
      Component: (
        <CommonSelect
          id="grade"
          className="editor"
          placeholder="선택해주세요"
          // FIXME: `classtype` 바인딩 하기
          options={cmsGradeOptions['고등']}
          value=""
          onChange={() => console.log('학년')} />
      ),
    },
    {
      id: 'term',
      label: '학기',
      Component: (
        <CommonSelect
          id="term"
          className="editor"
          placeholder="선택해주세요"
          options={cmsTermOptions}
          value=""
          onChange={() => console.log('학기')} />
      ),
    },
    {
      id: 'textbook_id',
      label: '교과서명',
      Component: (
        <SearchModalTrigger
          id="textbook_id"
          className="editor"
          placeholder="선택해주세요"
          value=""
          onOpen={openSearchModal} />
      ),
    },
  ], [openSearchModal]);

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
    <Accordion 
      className="MathChapter1"
      type="single"
      value={accordionValue}
      onValueChange={setAccordionValue}
      collapsible>
      <AccordionItem 
        className="MathChapter1-accordionItem"
        value="chapter1">
        <AccordionTrigger
          className="trigger"
          isHideChevronIcon>
          대단원
          <LuChevronDown className={cn(
            'icon',
            accordionValue ? 'open' : ''
          )} />
        </AccordionTrigger>

        <AccordionContent className="formBody">
          <div className="formBody-leftSide">
            {leftSideFormItems.map(item => {
              const {
                id,
                label,
                Component,
              } = item;

              return (
                <div 
                  key={id}
                  className="formItem">
                  <label 
                    htmlFor={id}
                    className="label">
                    {label}
                  </label>

                  {Component}
                </div>
              );
            })}
          </div>

          <div className="formBody-rightSide">
            {rightSideFormItems.map(item => {
              const {
                id,
                label,
                Component
              } = item;

              return (
                <div
                  key={id}
                  className="formItem">
                  <label
                    htmlFor={id}
                    className="label">
                    {label}
                  </label>

                  {Component}
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <div className="MathChapter1-chapter2Wrapper">
      {detailFormState.chapter2_set.map((chapter2, indexOfChapter2) => {
        return (
          <MathChapter2
            key={indexOfChapter2}
            indexOfChapter2={indexOfChapter2}
            chapter2={chapter2}
            onChange={params => {
              console.log('onChange() - params: ', params);
            }}
            onConfirmDelete={indexOfChapter2 => {
              console.log('onConfirmDelete() - indexOfChapter2: ', indexOfChapter2);
            }} />
        );
      })}
    </div>

    <SearchModal
      className="MathChapter1-textbookSearchModal"
      title="교과서"
      description="적용할 교과서를 선택해 주세요."
      isOpen={isOpenSearchModal}
      onChangeIsOpen={onChangeIsOpenSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathTextbooksApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathChapter1TextbookSearchTypeOptions}
      tableColumns={textbookColumns}
      onClickRow={onClickTextbook} />
  </>);
}

const MathChapter1 = memo(_MathChapter1);
export default MathChapter1;
