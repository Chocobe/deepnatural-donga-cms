// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// api
import ApiManager from '@/apis/ApiManager';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
import useAutoFocus from '@/components/hooks/useAutoFocus';
// ui
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
import { 
  InputWithAddon,
} from '@/components/shadcn-ui-custom/InputWithAddon/InputWithAddon';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import {
  LuSearch,
  LuFileInput,
} from 'react-icons/lu';
// type
import { 
  mathTextbookSearchTypeOptions,
} from './MathTextbookTableActions.type';
import { 
  TDeleteMathTextbookApiRequestParams,
  TRetrieveMathTextbooksApiRequestParams,
} from '@/apis/math/mathApi.type';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
// style
import './MathTextbookTableActions.css';

type TMathTextbookTableActionsProps = {
  retrieveMathTextbooks: (params: TRetrieveMathTextbooksApiRequestParams) => Promise<void>;
};

function _MathTextbookTableActions(props: TMathTextbookTableActionsProps) {
  const {
    retrieveMathTextbooks,
  } = props;

  //
  // mathTextbookPage store
  //
  const mathTextbooksData = useMathTextbookPageStore(state => state.mathTextbooksData);

  const searchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.searchParamsForRetrieveMathTextbooksApi);

  const updateSearchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.updateSearchParamsForRetrieveMathTextbooksApi);

  const selectedMathTextbooks = useMathTextbookPageStore(state => state.selectedMathTextbooks);

  //
  // resultNoticeModal store
  //
  const openSuccessNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);
  const openErrorNoticeModal = useResultNoticeModalStore(state => state.openErrorNoticeModal);

  //
  // state
  //
  const [searchType, setSearchType] = useState<string>(
    mathTextbookSearchTypeOptions[0].value
  );

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      title: undefined,
      author: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 100);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathTextbooksApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathTextbooksApi(searchParamsForRetrieveMathTextbooksApi => ({
      ...searchParamsForRetrieveMathTextbooksApi,
      title: undefined,
      author: undefined,
      ...{
        [searchType]: search,
      },
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathTextbooksApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
      },
    };

    retrieveMathTextbooks(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathTextbooksApi(old => ({
      ...old,
      title: undefined,
      author: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathTextbooksApi]);

  const onConfirmDelete = useCallback(async () => {
    if (!selectedMathTextbooks?.length) {
      return;
    }

    try {
      const promises = selectedMathTextbooks.map(({ id }) => {
        const params: TDeleteMathTextbookApiRequestParams = {
          pathParams: {
            textbookId: id,
          },
        };

        return ApiManager
          .math
          .deleteMathTextbookApi(params);
      });

      await Promise.all(promises);

      openSuccessNoticeModal({
        ...noticeMessageGroupFactory
          .apis
          .math
          .deleteMathTextbook
          .successMessage!(),
        firstButton: {
          text: '확인',
          variant: 'outline',
        }
      });

    } catch(_error: any) {
      openErrorNoticeModal({
        ...noticeMessageGroupFactory
          .apis
          .math
          .deleteMathTextbook
          .errorMessage(),
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });
    } finally {
      retrieveMathTextbooks({
        searchParams: searchParamsForRetrieveMathTextbooksApi,
      });
    }
  }, [
    selectedMathTextbooks,
    searchParamsForRetrieveMathTextbooksApi,
    openSuccessNoticeModal,
    openErrorNoticeModal,
    retrieveMathTextbooks,
  ]);

  const onClickDelete = useCallback(async () => {
    if (!selectedMathTextbooks?.length) {
      return;
    }

    openSuccessNoticeModal({
      ...noticeMessageGroupFactory.uis.math.confirmDeleteMathTextbooks(),
      firstButton: {
        text: '취소',
        variant: 'outline',
      },
      secondButton: {
        text: '삭제',
        variant: 'destructive',
        onClick: onConfirmDelete,
      },
    });
  }, [
    selectedMathTextbooks, 
    openSuccessNoticeModal, onConfirmDelete,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathTextbooksData);

  return (
    <div className="MathTextbookTableActions">
      <div className="MathTextbookTableActions-leftSide">
        <Select
          value={searchType}
          onValueChange={onChangeSearchType}>
          <SelectTrigger className="searchTypeSelect">
            <SelectValue placeholder="검색 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {mathTextbookSearchTypeOptions.map(item => {
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
          value={searchParamsForRetrieveMathTextbooksApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          RightAddon={LuSearch} />
      </div>

      <div className="MathTextbookTableActions-rightSide">
        <TBUTooltip>
          <Button
            className="actionButton"
            // 삭제 기능 비활성
            // disabled={!selectedMathTextbooks?.length}
            disabled
            onClick={onClickDelete}>
            삭제
          </Button>
        </TBUTooltip>

        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileInput className="icon" />
            Export
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathTextbookTableActions = memo(_MathTextbookTableActions);
export default MathTextbookTableActions;
