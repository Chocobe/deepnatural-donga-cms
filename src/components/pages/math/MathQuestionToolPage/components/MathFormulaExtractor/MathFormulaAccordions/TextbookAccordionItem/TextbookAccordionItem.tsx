// react
import {
  useRef,
  useMemo,
  useCallback,
  memo,
  MouseEvent,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useResetMetadataConfirmModal from '../../MathFormulaExtractorHeader/hooks/useResetMetadataConfirmModal';
import useRemoveSubTextbookConfirmModal from '../../MathFormulaExtractorHeader/hooks/useRemoveSubTextbookConfirmModal';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import TextbookSearchTemplate from './TextbookSearchTemplate/TextbookSearchTemplate';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/shadcn-ui/ui/accordion';
// icons
import {
  SlRefresh,
} from 'react-icons/sl';
import {
  FaRegTrashAlt,
} from 'react-icons/fa';
// type
import { 
  textbookMetadataTemplate,
  chapter1MetadataTemplate, 
  chapter2MetadataTemplate, 
  chapter3MetadataTemplate, 
} from '../mathFormulaAccordions.type';
import { 
  TRetrieveMathToolTextbooksApiRequestParams,
  TRetrieveMathToolTextbooksApiResponse,

  TRetrieveMathToolChapter1ApiRequestParams,
  TRetrieveMathToolChapter1ApiResponse,

  TRetrieveMathToolChapter2ApiRequestParams,
  TRetrieveMathToolChapter2ApiResponse,

  TRetrieveMathToolChapter3ApiRequestParams,
  TRetrieveMathToolChapter3ApiResponse,
} from '@/apis/mathTool/mathToolApi.type';

// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './TextbookAccordionItem.css';

type TTextbookAccordionItemProps = {
  accordionValue: string;
  isTarget: boolean;
};

function _TextbookAccordionItem(props: TTextbookAccordionItemProps) {
  const {
    accordionValue,
    isTarget,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const metadataState = useMathQuestionToolPageStore(state => state.ui.state.result.metadata);

  const clearMetadataItem_action = useMathQuestionToolPageStore(state => state.ui.action.clearMetadataItem_action);

  //
  // ref
  //
  const dynamicOnConfirmRef = useRef<(() => void) | undefined>();

  //
  // hook
  //
  const {
    openResetMetadataConfirmModal,
  } = useResetMetadataConfirmModal();

  const {
    onOpenRemoveSubTextbookConfirmModal,
  } = useRemoveSubTextbookConfirmModal();

  //
  // cache
  //
  const templateList = useMemo(() => [
    textbookMetadataTemplate,
    chapter1MetadataTemplate,
    chapter2MetadataTemplate,
    chapter3MetadataTemplate,
  ], []);

  const disabledList = useMemo(() => {
    const idList = templateList.map(({ id }) => id);

    let prevId: string;

    return idList.map((id, index) => {
      if (index === 0) {
        prevId = id;
        return false;
      }

      const hasPrecondition = !!metadataState[prevId as keyof typeof metadataState];
      prevId = id;

      return !hasPrecondition;
    });
  }, [templateList, metadataState]);

  //
  // callback
  //
  const removeSubTextbookMetadataCascading = useCallback((
    index: number,
    e?: MouseEvent
  ) => {
    e?.preventDefault();

    for (let i = templateList.length - 1; i >= index; i--) {
      const targetId = templateList[i].id;

      clearMetadataItem_action(targetId);
    }
  }, [templateList, clearMetadataItem_action]);

  const onOpenResetConfirmModal = useCallback((
    e: MouseEvent
  ) => {
    e.stopPropagation();

    const onConfirmResetTextbook = () => {
      removeSubTextbookMetadataCascading(0);
      dynamicOnConfirmRef.current = undefined;
    };

    dynamicOnConfirmRef.current = onConfirmResetTextbook;

    setTimeout(() => {
      openResetMetadataConfirmModal(onConfirmResetTextbook);
    });
  }, [
    removeSubTextbookMetadataCascading,
    openResetMetadataConfirmModal,
  ]);

  const onOpenRemoveConfirmModal = useCallback((
    index: number,
    e?: MouseEvent
  ) => {
    e?.stopPropagation();

    const onConfirmRemoveMetadata = () => {
      removeSubTextbookMetadataCascading(index);
      dynamicOnConfirmRef.current = undefined;
    };

    dynamicOnConfirmRef.current = onConfirmRemoveMetadata;

    setTimeout(() => {
      onOpenRemoveSubTextbookConfirmModal(onConfirmRemoveMetadata);
    });
  }, [
    removeSubTextbookMetadataCascading, 
    onOpenRemoveSubTextbookConfirmModal,
  ]);

  //
  // callback - search
  //
  const onSearchTextbook = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const params: TRetrieveMathToolTextbooksApiRequestParams = {
      searchParams: {
        title: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolTextbooksApi
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolTextbooksApiResponse;
  }, []);

  const onSearchChapter1 = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const textbook_title = metadataState.textbook_id?.metadata.title;

    if (!textbook_title) {
      return null;
    }

    const params: TRetrieveMathToolChapter1ApiRequestParams = {
      searchParams: {
        textbook_title,
        title: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolChapter1Api
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolChapter1ApiResponse;
  }, [metadataState.textbook_id]);

  const onSearchChapter2 = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const textbookTitle = metadataState.textbook_id?.metadata.title;
    const chapter1Title = metadataState.chapter1_id?.metadata.title;

    if (
      !textbookTitle ||
      !chapter1Title
    ) {
      return null;
    }

    const params: TRetrieveMathToolChapter2ApiRequestParams = {
      searchParams: {
        textbook_title: textbookTitle,
        chapter1_title: chapter1Title,
        title: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolChapter2Api
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolChapter2ApiResponse;
  }, [
    metadataState.textbook_id,
    metadataState.chapter1_id,
  ]);

  const onSearchChapter3 = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const textbookTitle = metadataState.textbook_id?.metadata.title;
    const chapter1Title = metadataState.chapter1_id?.metadata.title;
    const chapter2Title = metadataState.chapter2_id?.metadata.title;

    if (
      !textbookTitle ||
      !chapter1Title || 
      !chapter2Title
    ) {
      return null;
    }

    const params: TRetrieveMathToolChapter3ApiRequestParams = {
      searchParams: {
        textbook_title: textbookTitle,
        chapter1_title: chapter1Title,
        chapter2_title: chapter2Title,
        title: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolChapter3Api
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolChapter3ApiResponse;
  }, [
    metadataState.textbook_id,
    metadataState.chapter1_id,
    metadataState.chapter2_id,
  ]);

  const listOfOnSearch = useMemo(() => [
    onSearchTextbook,
    onSearchChapter1,
    onSearchChapter2,
    onSearchChapter3,
  ], [
    onSearchTextbook, onSearchChapter1,
    onSearchChapter2, onSearchChapter3,
  ]);

  return (<>
    <AccordionItem 
      className={cn(
        'TextbookAccordionItem',
        isTarget ? 'isTarget' : ''
      )}
      value={accordionValue}>
      <AccordionTrigger>
        <div 
          className="TextbookAccordionItem-trigger">
          <div className="itemName">
            교과서
          </div>

          <div
            className={cn(
              'valueSummary',
              { placeholder: !metadataState.textbook_id }
            )}>
            {metadataState.textbook_id?.summary ?? ''}
          </div>

          <div className="actionsWrapper">
            <SlRefresh
              className="actionButton"
              size="20px"
              onClick={onOpenResetConfirmModal} />
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="p-4 h-auto">
        <div className="TextbookAccordionItem-content">
          <div className="searchWrapper">
            {templateList.map((template, index) => {
              const disabled = disabledList[index];

              return (
                <TextbookSearchTemplate<any>
                  key={template.id}
                  metadataTemplate={template} 
                  disabled={disabled}
                  onSearch={listOfOnSearch[index]} />
              );
            })}
          </div>

          <div className="valueList">
            {templateList.map((template, index) => {
              return (
                <div 
                  key={`${template.id}-${index}`}
                  className="inner">
                  {template.details.map(detail => {
                    const {
                      key,
                      label,
                    } = detail;

                    const value = metadataState[template.id]?.metadata[key];

                    if (!value) {
                      return null;
                    }

                    return (
                      <div
                        key={`${template.id}-${label}`}
                        className="valueWrapper">
                        <div className="label">
                          {label}
                        </div>

                        <div className="value">
                          {value}
                        </div>

                        <FaRegTrashAlt
                          className="clearButton"
                          size="20px"
                          onClick={(e: MouseEvent) => onOpenRemoveConfirmModal(index, e)} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </>);
}

const TextbookAccordionItem = memo(_TextbookAccordionItem) as typeof _TextbookAccordionItem;
export default TextbookAccordionItem;
