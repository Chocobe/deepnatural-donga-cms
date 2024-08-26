// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// hook
import useDetailPageNextActionAfterSubmit from '@/components/pages/hooks/useDetailPageNextActionAfterSubmit';
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

  //
  // hook
  //
  const {
    // nextActionAfterSubmitRef,
    addAfterSubmit,
    remainAfterSubmit,
    defaultAfterSubmit,
  } = useDetailPageNextActionAfterSubmit();

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
      .patchMathTextbookApi(params);

    console.log('response.data: ', response.data);
  }, [detailFormState]);

  const onClickSaveAndAdd = useCallback(() => {
    console.group('저장후 추가하기');
    console.log('formState: ', detailFormState);
    console.groupEnd();

    addAfterSubmit();
    patchMathTextbook();
  }, [detailFormState, addAfterSubmit, patchMathTextbook]);

  const onClickSaveAndRemain = useCallback(() => {
    console.group('저장후 계속해서 수정하기');
    console.log('formState: ', detailFormState);
    console.groupEnd();

    remainAfterSubmit();
    patchMathTextbook();
  }, [detailFormState, remainAfterSubmit, patchMathTextbook]);

  const onClickSave = useCallback(() => {
    console.group('저장하기');
    console.log('formState: ', detailFormState);
    console.groupEnd();

    defaultAfterSubmit();
    patchMathTextbook();
  }, [detailFormState, defaultAfterSubmit, patchMathTextbook]);

  const onClickAdd = useCallback(() => {
    console.group('추가하기');
    console.log('formState: ', detailFormState);
    console.groupEnd();

    defaultAfterSubmit();
    // submit();
  }, [
    detailFormState, defaultAfterSubmit, 
    // submit
  ]);

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
