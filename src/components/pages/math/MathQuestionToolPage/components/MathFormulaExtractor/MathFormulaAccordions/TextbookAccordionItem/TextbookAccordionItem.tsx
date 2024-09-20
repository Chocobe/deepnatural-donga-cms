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
import useMathQuestionToolErrorModal from '../../../ui/MathQuestionToolErrorModal/hooks/useMathQuestionToolErrorModal';
import useResetMetadataConfirmModal from '../../MathFormulaExtractorHeader/hooks/useResetMetadataConfirmModal';
import useRemoveSubTextbookConfirmModal from '../../MathFormulaExtractorHeader/hooks/useRemoveSubTextbookConfirmModal';
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
  chapter1MetadataTemplate, 
  chapter2MetadataTemplate, 
  chapter3MetadataTemplate, 
  textbookMetadataTemplate,
} from '../mathFormulaAccordions.type';
import { 
  TRetrieveTextbookApiPayload,
  TRetrieveChapter1ApiPayload,
  TRetrieveChapter2ApiPayload,
  TRetrieveChapter3ApiPayload,
} from '../../../../network/network.type/searchApi.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './TextbookAccordionItem.css';
// api
// FIXME: API 연동하기
// import ApiManager from '@/network/ApiManager';
import apiFeedbackMessageFactory, {
  createErrorMessage,
} from '../../../../network/apiFeedbackMessageFactory';

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
  const resetApiLoadingUiState_action  = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action );
  const setApiLoadingUiState_action  = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action );

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

  const {
    openErrorModal,
  } = useMathQuestionToolErrorModal();

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

  const onErrorWhenSearch = useCallback((params: {
    error: any;
    createDefaultErrorMessage: (status: string | number) => string;
  }) => {
    const message = createErrorMessage(params);

    openErrorModal({
      buttonActionType: 'close',
      message,
    });
  }, [openErrorModal]);

  //
  // callback - search
  //
  const onSearchTextbook = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveTextbookListRequest(),
      });

      const payload: TRetrieveTextbookApiPayload = {
        pathParams: {
          title: searchValue,
          page,
        },
      };

      // FIXME: API 연동하기
      // const response = await ApiManager.retrieveTextbookList(payload);
      console.log('onSearchTextbook() - payload: ', payload);

      // FIXME: API 연동하기
      // return response?.data;
      return Promise.resolve({
        results: [],
      });
    } catch(error: any) {
      onErrorWhenSearch({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveTextbookListFailure,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
    onErrorWhenSearch, 
  ]);

  const onSearchChapter1 = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const textbookTitle = metadataState.textbook_id?.metadata.title;

    if (!textbookTitle) {
      return null;
    }

    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter1ListRequest(),
      });

      const payload: TRetrieveChapter1ApiPayload = {
        pathParams: {
          title: searchValue,
          textbookTitle,
          page,
        },
      };

      // FIXME: API 연동하기
      // const response = await ApiManager.retrieveChapter1List(payload);
      console.log('onSearchChapter1() - payload: ', payload);

      // FIXME: API 연동하기
      // return response?.data;
      return {
        results: [],
      };
    } catch(error: any) {
      onErrorWhenSearch({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter1ListFailure,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    metadataState.textbook_id, 
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
    onErrorWhenSearch,
  ]);

  const onSearchChapter2 = useCallback(async (
    searchValue: string,
    page?: number
  ) => {
    const textbookTitle = metadataState.textbook_id?.metadata.title;
    const chapter1Title = metadataState.chapter1_id?.metadata.title;

    if (!textbookTitle || !chapter1Title) {
      return null;
    }

    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter2ListRequest(),
      });

      const payload: TRetrieveChapter2ApiPayload = {
        pathParams: {
          title: searchValue,
          textbookTitle,
          chapter1Title,
          page,
        },
      };

      // FIXME: API 연동하기
      // const response = await ApiManager.retrieveChapter2List(payload);
      console.log('onSearchChapter2() - payload: ', payload);

      // FIXME: API 연동하기
      // return response?.data;
      return {
        results: [],
      };
    } catch(error: any) {
      onErrorWhenSearch({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter2ListFailure,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    metadataState.textbook_id, 
    metadataState.chapter1_id,
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
    onErrorWhenSearch,
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

    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter3ListRequest()
      });

      const payload: TRetrieveChapter3ApiPayload = {
        pathParams: {
          title: searchValue,
          textbookTitle,
          chapter1Title,
          chapter2Title,
          page,
        },
      };

      // FIXME: API 연동하기
      // const response = await ApiManager.retrieveChapter3List(payload);
      console.log('onSearchChapter3() - payload: ', payload);

      // FIXME: API 연동하기
      // return response?.data;
      return {
        results: [],
      };
    } catch(error: any) {
      onErrorWhenSearch({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveChapter3ListFailure,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    metadataState.textbook_id,
    metadataState.chapter1_id,
    metadataState.chapter2_id,
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
    onErrorWhenSearch,
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
