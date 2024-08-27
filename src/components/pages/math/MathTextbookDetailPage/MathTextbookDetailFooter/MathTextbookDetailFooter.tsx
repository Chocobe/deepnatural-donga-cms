// react
import {
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  TPatchMathTextbookApiRequestParams,
  TProduceMathTextbookApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathTextbookDetailFooter.css';

type TMathTextbookDetailFooterProps = {
  isDetailMode: boolean;
};

function _MathTextbookDetailFooter(props: TMathTextbookDetailFooterProps) {
  const {
    isDetailMode,
  } = props;

  //
  // mathTextbookPage store
  //
  const detailFormState = useMathTextbookPageStore(state => state.detailFormState);

  const clearDetailTargetMathTextbook = useMathTextbookPageStore(state => state.clearDetailTargetMathTextbook);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const patchMathTextbook = useCallback(async () => {
    const {
      id,
      ...payload
    } = detailFormState;

    if (!id) {
      return;
    }

    const params: TPatchMathTextbookApiRequestParams = {
      pathParams: {
        textbookId: id,
      },
      payload,
    };

    const response = await ApiManager
      .math
      .patchMathTextbookApi
      .callWithNoticeMessageGroup(params);

    return response;
  }, [detailFormState]);

  const produceMathTextbook = useCallback(async () => {
    const params: TProduceMathTextbookApiRequestParams = {
      payload: detailFormState,
    };

    const response = await ApiManager
      .math
      .produceMathTextbook
      .callWithNoticeMessageGroup(params);

    return response?.data;
  }, [detailFormState]);

  const onClickSaveAndAdd = useCallback(async () => {
    await patchMathTextbook();

    clearDetailTargetMathTextbook();

    navigate(routePathFactory
      .math
      .getTextbookAddPath()
    );
  }, [
    patchMathTextbook, 
    clearDetailTargetMathTextbook, navigate,
  ]);

  const onClickSaveAndRemain = useCallback(async () => {
    await patchMathTextbook();
  }, [patchMathTextbook]);

  const onClickSave = useCallback(async () => {
    await patchMathTextbook();

    navigate(routePathFactory
      .math
      .getTextbookPath()
    );
  }, [patchMathTextbook, navigate]);

  const onClickAdd = useCallback(async () => {
    const mathTextbook = await produceMathTextbook();
    const textbookId = mathTextbook?.id;

    if (!textbookId) {
      return;
    }

    navigate(
      routePathFactory
        .math
        .getTextbookDetailPath(textbookId), 
      {
        replace: true,
      }
    );
  }, [produceMathTextbook, navigate]);

  return (<>
    <div className="MathTextbookDetailFooter">
      {isDetailMode
        ? (<>
          <Button
            className="MathTextbookDetailFooter-actionButton secondary"
            variant="secondary"
            onClick={onClickSaveAndAdd}>
            저장후 추가하기
          </Button>

          <Button
            className="MathTextbookDetailFooter-actionButton secondary"
            variant="secondary"
            onClick={onClickSaveAndRemain}>
            저장후 계속해서 수정하기
          </Button>

          <Button
            className="MathTextbookDetailFooter-actionButton default"
            variant="default"
            onClick={onClickSave}>
            <LuSave className="icon" />
            저장하기
          </Button>
        </>): (<>
          <Button
            className="MathTextbookDetailFooter-actionButton default"
            variant="default"
            onClick={onClickAdd}>
            <LuSave className="icon" />
            추가하기
          </Button>
        </>)
      }
    </div>
  </>);
}

const MathTextbookDetailFooter = memo(_MathTextbookDetailFooter) as typeof _MathTextbookDetailFooter;
export default MathTextbookDetailFooter;
