// react
import {
  useRef,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathStores/mathTextbookPageStore/mathTextbookPageStore';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
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
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
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
import ApiManager from '@/apis/ApiManager';

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
  const {
    search = '',
  } = searchParamsForRetrieveMathTextbooksApi;

  const updateSearchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.updateSearchParamsForRetrieveMathTextbooksApi);

  const selectedMathTextbooks = useMathTextbookPageStore(state => state.selectedMathTextbooks);

  //
  // resultNoticeModal store
  //
  const openSuccessNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);
  const openErrorNoticeModal = useResultNoticeModalStore(state => state.openErrorNoticeModal);

  //
  // ref
  //
  const $searchInputRef = useRef<HTMLInputElement | null>(null);

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    console.log('onChangeSearchType() - searchType: ', searchType);
  }, []);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathTextbooksApi(searchParamsForRetrieveMathTextbooksApi => ({
      ...searchParamsForRetrieveMathTextbooksApi,
      search,
    }));
  }, [updateSearchParamsForRetrieveMathTextbooksApi]);

  const onEnter = useCallback(() => {
    $searchInputRef.current?.blur();

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
      },
    };

    retrieveMathTextbooks(params);
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathTextbooksApi(searchParamsForRetrieveMathTextbooksApi => ({
      ...searchParamsForRetrieveMathTextbooksApi,
      search: undefined,
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

  //
  // effect
  //
  useEffect(function focusSearchInput() {
    $searchInputRef.current?.focus();
  }, [mathTextbooksData]);

  return (
    <div className="MathTextbookTableActions">
      <div className="MathTextbookTableActions-leftSide">
        <TBUTooltip>
          <Select
            value={''}
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
        </TBUTooltip>

        <InputWithIcon
          ref={$searchInputRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          EndIcon={LuSearch} />
      </div>

      <div className="MathTextbookTableActions-rightSide">
        <Button
          className="actionButton"
          disabled={!selectedMathTextbooks?.length}
          onClick={onClickDelete}>
          삭제
        </Button>

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
