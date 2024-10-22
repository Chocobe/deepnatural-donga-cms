// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
import useAutoFocus from '@/components/hooks/useAutoFocus';
import useExportModalSet from '@/components/shadcn-ui-custom/modals/ExportModalSet/hook/useExportModalSet';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
import { 
  InputWithAddon,
  SearchButtonForInputWithAddon,
} from '@/components/shadcn-ui-custom/InputWithAddon';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import ExportModalSet from '@/components/shadcn-ui-custom/modals/ExportModalSet/ExportModalSet';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// type
import { 
  mathQuestionSearchTypeOptions,
} from './MathQuestionTableActions.type';
import { 
  TProduceMathQuestionsExportApiRequestParams,
  TRetrieveMathQuestionsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TExportModalSetFileFormat,
} from '@/components/shadcn-ui-custom/modals/ExportModalSet/ExportModalSet.type';
// style
import './MathQuestionTableActions.css';

type TMathQuestionTableActionsProps = {
  retrieveMathQuestions: (params: TRetrieveMathQuestionsApiRequestParams) => Promise<void>;
};

function _MathQuestionTableActions(props: TMathQuestionTableActionsProps) {
  const {
    retrieveMathQuestions,
  } = props;

  //
  // mathQuestionPage store
  //
  const mathQuestionsData = useMathQuestionPageStore(state => state.mathQuestionsData);
  const searchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.searchParamsForRetrieveMathQuestionsApi);
  const selectedMathQuestions = useMathQuestionPageStore(state => state.selectedMathQuestions);

  const updateSearchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.updateSearchParamsForRetrieveMathQuestionsApi);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // state
  //
  const [searchType, setSearchType] = useState(mathQuestionSearchTypeOptions[0].value);

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathQuestionsApi(old => ({
      ...old,
      content: undefined,
      internal_id: undefined,
      instruction_inquiry: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 100);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathQuestionsApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathQuestionsApi(old => ({
      ...old,
      content: undefined,
      internal_id: undefined,
      instruction_inquiry: undefined,
      [searchType]: search,
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathQuestionsApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathQuestionsApi,
      },
    };

    retrieveMathQuestions(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathQuestionsApi,
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathQuestionsApi(old => ({
      ...old,
      content: undefined,
      internal_id: undefined,
      instruction_inquiry: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathQuestionsApi]);

  const SearchButtonAddon = useCallback((props: any) => {
    return (
      <SearchButtonForInputWithAddon
        {...props}
        onClick={() => {
          retrieveMathQuestions({
            searchParams: searchParamsForRetrieveMathQuestionsApi,
          });
        }} />
    );
  }, [
    searchParamsForRetrieveMathQuestionsApi,
    retrieveMathQuestions,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  }  = useOnKeyDownEnterOrESC(
    onEnter,
    onESC
  );

  const {
    $editorRef,
  } = useAutoFocus(mathQuestionsData);

  const {
    isOpenExportModal,
    openExportModal,
    closeExportModal,
  } = useExportModalSet();

  //
  // callback
  //
  const produceExportQuestions = useCallback(async (fileFormat: TExportModalSetFileFormat) => {
    if (!selectedMathQuestions?.length) {
      return;
    }

    const params: TProduceMathQuestionsExportApiRequestParams = {
      payload: {
        file_format: fileFormat,
        export_ids: selectedMathQuestions.map(question => question.id),
      },
    };

    const response = await ApiManager
      .math
      .produceMathQuestionsExportApi
      .callWithNoticeMessageGroup(params);

    closeExportModal();

    return response?.data;
  }, [
    selectedMathQuestions,
    closeExportModal,
  ]);

  const _openExportModal = useCallback(() => {
    if (!selectedMathQuestions?.length) {
      openNoticeModal({
        title: '',
        message: '다운로드할 문항을 선택해 주세요.',
        firstButton: {
          text: '확인',
          variant: 'default',
        },
      });

      return;
    }

    openExportModal();
  }, [
    selectedMathQuestions,
    openNoticeModal,
    openExportModal,
  ]);

  return (
    <div className="MathQuestionTableActions">
      <div className="MathQuestionTableActions-leftSide">
        <Select
          value={searchType}
          onValueChange={onChangeSearchType}>
          <SelectTrigger className="searchTypeSelect">
            <SelectValue placeholder="검색 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {mathQuestionSearchTypeOptions.map(item => {
              const {
                text,
                value,
              } = item;

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

        <InputWithAddon
          ref={$editorRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={searchParamsForRetrieveMathQuestionsApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          RightAddon={SearchButtonAddon} />
      </div>

      <div className="MathQuestionTableActions-rightSide">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            삭제
          </Button>
        </TBUTooltip>

        <ExportModalSet 
          isOpen={isOpenExportModal}
          openExportModal={_openExportModal}
          closeExportModal={closeExportModal}
          exportApiFunction={produceExportQuestions} />
      </div>
    </div>
  );
}

const MathQuestionTableActions = memo(_MathQuestionTableActions);
export default MathQuestionTableActions;
