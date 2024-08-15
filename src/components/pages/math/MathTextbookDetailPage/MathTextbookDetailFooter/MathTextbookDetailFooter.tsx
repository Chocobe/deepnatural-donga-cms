// react
import {
  useState,
  useCallback,
  memo,
} from 'react';
// store
import useMathTextbookDetailStore from '@/store/mathTextbookDetailStore/mathTextbookDetailStore';
// hook
import useDetailPageNextActionAfterSubmit from '@/components/pages/hooks/useDetailPageNextActionAfterSubmit';
// ui
import ResultNoticeModal from '@/components/shadcn-ui-custom/modals/ResultNoticeModal/ResultNoticeModal';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuSave,
} from 'react-icons/lu';
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
  // mathTextbookDetail store
  //
  const formState = useMathTextbookDetailStore(state => state.formState);

  //
  // state
  //
  const [isOpenSuccessNoticeModal, setIsOpenSuccessNoticeModal] = useState(false);
  const [isOpenErrorNoticeModal, setIsOpenErrorNoticeModal] = useState(false);

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
  const submit = useCallback(() => {
    console.group('submit()');
    console.log(isDetailMode ? '저장 API 호출하기' : '추가 API 호출하기');
    console.groupEnd();

    setIsOpenSuccessNoticeModal(true);
  }, [isDetailMode]);

  const onClickSaveAndAdd = useCallback(() => {
    console.group('저장후 추가하기');
    console.log('formState: ', formState);
    console.groupEnd();

    addAfterSubmit();
    submit();
  }, [formState, addAfterSubmit, submit]);

  const onClickSaveAndRemain = useCallback(() => {
    console.group('저장후 계속해서 수정하기');
    console.log('formState: ', formState);
    console.groupEnd();

    remainAfterSubmit();
    submit();
  }, [formState, remainAfterSubmit, submit]);

  const onClickSave = useCallback(() => {
    console.group('저장하기');
    console.log('formState: ', formState);
    console.groupEnd();

    defaultAfterSubmit();
    submit();
  }, [formState, defaultAfterSubmit, submit]);

  const onClickAdd = useCallback(() => {
    console.group('추가하기');
    console.log('formState: ', formState);
    console.groupEnd();

    defaultAfterSubmit();
    submit();
  }, [formState, defaultAfterSubmit, submit]);

  const confirmSuccess = useCallback(() => {
    console.group('confirmSuccess()');
    console.log(isDetailMode ? '저장하기 성공 확인' : '추가하기 성공 확인');
    console.groupEnd();

    setIsOpenSuccessNoticeModal(false);
  }, [isDetailMode]);

  const closeSuccessNoticeModal = useCallback(() => {
    setIsOpenSuccessNoticeModal(false);
  }, []);

  const closeErrorNoticeModal = useCallback(() => {
    setIsOpenErrorNoticeModal(false);
  }, []);

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

    <ResultNoticeModal
      title={isDetailMode
        ? '저장하기 완료'
        : '추가하기 완료'
      }
      description={isDetailMode
        ? '입력하신 내용이 성공적으로 저장되었습니다.'
        : '입력하신 내용이 성공적으로 추가되었습니다.'
      }
      variant="success"
      isOpen={isOpenSuccessNoticeModal}
      setIsOpen={setIsOpenSuccessNoticeModal}
      firstButtonText="취소"
      firstButtonVariant="outline"
      onClickFirstButton={closeSuccessNoticeModal}
      secondButtonText="확인"
      secondButtonVariant="default"
      onClickSecondButton={confirmSuccess} />

    <ResultNoticeModal
      title={isDetailMode
        ? '저장하기 오류'
        : '추가하기 오류'
      }
      description={isDetailMode
        ? '오류가 발생하여 저장되지 않았습니다. 다시 시도해주세요.'
        : '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.'
      }
      variant="error"
      isOpen={isOpenErrorNoticeModal}
      setIsOpen={setIsOpenErrorNoticeModal}
      firstButtonText="취소"
      firstButtonVariant="outline"
      onClickFirstButton={closeErrorNoticeModal}
      secondButtonText="다시 입력하기"
      secondButtonVariant="default"
      onClickSecondButton={submit} />
  </>);
}

const MathTextbookDetailFooter = memo(_MathTextbookDetailFooter) as typeof _MathTextbookDetailFooter;
export default MathTextbookDetailFooter;
