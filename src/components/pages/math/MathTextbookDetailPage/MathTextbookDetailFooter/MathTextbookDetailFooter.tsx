// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
import useResultNoticeModalStore from '@/store/resultNoticeModalStore/resultNoticeModalStore';
// hook
import useDetailPageNextActionAfterSubmit from '@/components/pages/hooks/useDetailPageNextActionAfterSubmit';
// ui
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
  // mathTextbookPage store
  //
  const formState = useMathTextbookPageStore(state => state.detailFormState);

  //
  // resultNoticeModal store
  //
  const openSuccessNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);
  const openErrorNoticeModal = useResultNoticeModalStore(state => state.openErrorNoticeModal);

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
  const _openSuccessNoticeModal = useCallback(() => {
    openSuccessNoticeModal({
      title: isDetailMode
        ? '저장하기 완료'
        : '추가하기 완료',
      message: isDetailMode
        ? '입력하신 내용이 성공적으로 저장되었습니다.'
        : '입력하신 내용이 성공적으로 추가되었습니다.',
      firstButton: {
        text: '취소',
        variant: 'outline',
        onClick: () => console.log('SuccessNoticeModal - 취소'),
      },
      secondButton: {
        text: '확인',
        variant: 'default',
        onClick: () => console.log('SuccessNoticeModal - 확인'),
      },
    });
  }, [isDetailMode, openSuccessNoticeModal]);

  const _openErrorNoticeModal = useCallback(() => {
    openErrorNoticeModal({
      title: isDetailMode
        ? '저장하기 오류'
        : '추가하기 오류',
      message: isDetailMode
        ? '오류가 발생하여 저장되지 않았습니다. 다시 시도해주세요.'
        : '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.',
      firstButton: {
        text: '취소',
        variant: 'outline',
        onClick: () => console.log('ErrorNoticeModal - 취소'),
      },
      secondButton: {
        text: '다시 입력하기',
        variant: 'default',
        onClick: () => console.log('ErrorNoticeModal - 다시 입력하기'),
      },
    });
  }, [isDetailMode, openErrorNoticeModal]);

  const submit = useCallback(() => {
    console.group('submit()');
    console.log(isDetailMode ? '저장 API 호출하기' : '추가 API 호출하기');
    console.groupEnd();

    Math.random() > 0.5
      ? _openSuccessNoticeModal()
      : _openErrorNoticeModal();
  }, [isDetailMode, _openSuccessNoticeModal, _openErrorNoticeModal]);

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
