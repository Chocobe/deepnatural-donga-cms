// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuPlus, 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  initialMathChapterPageStoreDetailChapter2,
} from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore.type';
import { 
  TPutMathChapterApiRequestParams,
  TProduceMathChapterApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathChapterDetailFooter.css';

type TMathChapterDetailFooterProps = {
  isDetailMode: boolean;
}

function _MathChapterDetailFooter(props: TMathChapterDetailFooterProps) {
  const {
    isDetailMode,
  } = props;

  //
  // mathChapterPage store
  //
  const detailFormState = useMathChapterPageStore(state => state.detailFormState);

  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);
  const clearDetailTargetMathChapter = useMathChapterPageStore(state => state.clearDetailTargetMathChapter);

  //
  // resultNoticeMessage store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const patchMathChapter = useCallback(async () => {
    const {
      id,
      textbook_id,
      ...payload
    } = detailFormState;

    if (!id) {
      return;
    }

    if (!textbook_id) {
      openNoticeModal({
        title: '',
        message: '교과서를 선택해 주세요.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    const params: TPutMathChapterApiRequestParams = {
      pathParams: {
        chapterId: id,
      },
      payload: {
        ...payload,
        textbook_id,
        chapter2_set: payload.chapter2_set.map(chapter2 => ({
          ...chapter2,
          textbook_id,
          chapter3_set: chapter2.chapter3_set.map(chapter3 => ({
            ...chapter3,
            textbook_id,
          }))
        }))
      },
    };

    return ApiManager
      .math
      .putMathChapterApi
      .callWithNoticeMessageGroup(params);
  }, [
    detailFormState,
    openNoticeModal,
  ]);

  const produceMathChapter = useCallback(async () => {
    const {
      no,
      title,
      textbook_id,
      chapter2_set,
    } = detailFormState;

    if (!textbook_id) {
      openNoticeModal({
        title: '',
        message: '교과서를 선택해 주세요.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    const params: TProduceMathChapterApiRequestParams = {
      payload: {
        no,
        title,
        textbook_id,
        chapter2_set: chapter2_set.map(chapter2 => ({
          ...chapter2,
          textbook_id,
          chapter3_set: chapter2.chapter3_set.map(chapter3 => ({
            ...chapter3,
            textbook_id,
          })),
        })),
      },
    };

    const response = await ApiManager
      .math
      .produceMathChapterApi
      .callWithNoticeMessageGroup(params);

    return response?.data;
  }, [
    detailFormState,
    openNoticeModal,
  ]);

  const addMathChapter2 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      chapter2_set: [
        ...(old.chapter2_set ?? []),
        {
          ...initialMathChapterPageStoreDetailChapter2,
        },
      ],
    }));
  }, [updateDetailFormState]);

  const onClickSaveAndAdd = useCallback(async () => {
    await patchMathChapter();

    clearDetailTargetMathChapter();

    navigate(routePathFactory
      .math
      .getChapterAddPath()
    );
  }, [
    patchMathChapter,
    clearDetailTargetMathChapter,
    navigate,
  ]);

  const onClickSaveAndRemain = useCallback(async () => {
    await patchMathChapter();
  }, [patchMathChapter]);

  const onClickSave = useCallback(async () => {
    await patchMathChapter();

    navigate(routePathFactory
      .math
      .getChapterPath()
    );
  }, [patchMathChapter, navigate]);

  const onClickAdd = useCallback(async () => {
    const mathChapter = await produceMathChapter();

    if (!mathChapter) {
      return;
    }

    navigate(routePathFactory
      .math
      .getChapterPath()
    );
  }, [produceMathChapter, navigate]);

  //
  // cache
  //
  const buttonItems = useMemo(() => {
    return isDetailMode
      ? [
        {
          text: '저장후 추가하기',
          variant: 'secondary',
          onClick: onClickSaveAndAdd,
          IconComponent: undefined,
        },
        {
          text: '저장후 계속해서 수정하기',
          variant: 'secondary',
          onClick: onClickSaveAndRemain,
          IconComponent: undefined,
        },
        {
          text: '저장하기',
          variant: 'default',
          onClick: onClickSave,
          IconComponent: LuSave,
        },
      ]: [
        {
          text: '추가하기',
          variant: 'default',
          onClick: onClickAdd,
          IconComponent: LuSave,
        },
      ];
  }, [
    isDetailMode,
    onClickAdd,
    onClickSaveAndAdd,
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathChapterDetailFooter">
      <div className="MathChapterDetailFooter-leftSide">
        <Button
          className="button"
          variant="default"
          onClick={addMathChapter2}>
          <LuPlus className="icon" />
          중단원 추가
        </Button>
      </div>

      <div className="MathChapterDetailFooter-rightSide">
        {buttonItems.map((item, index) => {
          const {
            text,
            variant,
            onClick,
            IconComponent,
          } = item;

          return (
            <Button
              key={index}
              className="button"
              variant={variant as ButtonProps['variant']}
              onClick={onClick}>
              {IconComponent && (
                <IconComponent className="icon" />
              )}

              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

const MathChapterDetailFooter = memo(_MathChapterDetailFooter);
export default MathChapterDetailFooter;
