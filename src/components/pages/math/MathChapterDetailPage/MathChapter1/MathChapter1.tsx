// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
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
import MathChapter2 from '../MathChapter2/MathChapter2';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// icon
import { 
  LuChevronDown,
} from 'react-icons/lu';
// type
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  mathChapter1TextbookSearchTypeOptions,
} from './MathChapter1.type';
import { 
  cmsClassTypeMapper,
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
// util
import extractLastString from '@/utils/extractLastString/extractLastString';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapter1.css';

const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();

function _MathChapter1() {
  //
  // mathChapterPage store
  //
  const detailFormState = useMathChapterPageStore(state => state.detailFormState);
  const {
    no,
    title,
  } = detailFormState;

  const detailFormStateReference = useMathChapterPageStore(state => state.detailFormStateReference);
  const {
    textbook,
  } = detailFormStateReference;
  const {
    title: textbookTitle = '',
    classtype: textbookClasstype = '',
    grade: textbookGrade = '',
    term: textbookTerm = '',
  } = textbook ?? {};

  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);
  const updateDetailFormStateReference = useMathChapterPageStore(state => state.updateDetailFormStateReference);

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
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    const key = extractLastString(id, '__');

    if (!key) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      [key]: value,
    }));
  }, [updateDetailFormState]);

  const onSelectTextbook = useCallback((textbook: TMathTextbookModel) => {
    updateDetailFormStateReference(old => ({
      ...old,
      textbook,
    }));

    updateDetailFormState(old => ({
      ...old,
      textbook_id: textbook.id,
      textbook_title: textbook.title,
    }));

    closeSearchModal();
  }, [
    updateDetailFormStateReference, 
    updateDetailFormState,
    closeSearchModal,
  ]);

  //
  // cache
  //
  const leftSideFormItems = useMemo(() => [
    {
      id: 'chapter1__no',
      label: '순번',
      Component: (
        <Input
          id="chapter1__no"
          className="editor"
          value={no}
          onChange={onChangeInput} />
      ),
    },
    {
      id: 'chapter1__title',
      label: '대단원 제목',
      Component: (
        <Input
          id="chapter1__title"
          className="editor"
          value={title}
          onChange={onChangeInput} />
      ),
    },
  ], [
    no, title,
    onChangeInput,
  ]);

  const rightSideFormItems = useMemo(() => [
    {
      id: 'chapter1__textbook_id',
      label: '교과서명',
      Component: (
        <SearchModalTrigger
          id="chapter1__textbook_id"
          className="editor"
          placeholder="선택해주세요"
          value={textbook ? textbookTitle : ''}
          onOpen={openSearchModal} />
      ),
    },
    {
      id: 'chapter1__classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="chapter1__classtype"
          className="editor"
          placeholder="선택해주세요"
          options={cmsClassTypeOptions}
          value={textbook ? textbookClasstype : ''}
          onChange={() => console.log('학교급')}
          disabled />
      ),
    },
    {
      id: 'chapter1__grade',
      label: '학년',
      Component: (
        <CommonSelect
          id="chapter1__grade"
          className="editor"
          placeholder="선택해주세요"
          options={textbook ? cmsGradeOptions[textbookClasstype] : []}
          value={String(textbookGrade)}
          onChange={() => console.log('학년')}
          disabled />
      ),
    },
    {
      id: 'chapter1__term',
      label: '학기',
      Component: (
        <CommonSelect
          id="chapter1__term"
          className="editor"
          placeholder="선택해주세요"
          options={cmsTermOptions}
          value={String(textbookTerm)}
          onChange={() => console.log('학기')} 
          disabled />
      ),
    },
  ], [
    textbook, textbookTitle, textbookClasstype, 
    textbookGrade, textbookTerm,
    openSearchModal,
  ]);

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
            key={`${detailFormState.chapter2_set.length}-${indexOfChapter2}`}
            indexOfChapter2={indexOfChapter2}
            chapter2={chapter2} />
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
      onClickRow={onSelectTextbook} />
  </>);
}

const MathChapter1 = memo(_MathChapter1);
export default MathChapter1;
