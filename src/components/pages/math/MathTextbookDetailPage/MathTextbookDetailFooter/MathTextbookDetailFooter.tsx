// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathTextbookDetailStore from '@/store/mathTextbookDetailStore/mathTextbookDetailStore';
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
  // mathTextbookDetail store
  //
  const formState = useMathTextbookDetailStore(state => state.formState);

  //
  // callback
  //
  const onClickSaveAndAdd = useCallback(() => {
    console.group('저장후 추가하기');
    console.log('formState: ', formState);
    console.groupEnd();
  }, [formState]);

  const onClickSaveAndRemain = useCallback(() => {
    console.group('저장후 계속해서 수정하기');
    console.log('formState: ', formState);
    console.groupEnd();
  }, [formState]);

  const onClickSave = useCallback(() => {
    console.group('저장하기');
    console.log('formState: ', formState);
    console.groupEnd();
  }, [formState]);

  const onClickAdd = useCallback(() => {
    console.group('추가하기');
    console.log('formState: ', formState);
    console.groupEnd();
  }, [formState]);

  return (
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
  );
}

const MathTextbookDetailFooter = memo(_MathTextbookDetailFooter) as typeof _MathTextbookDetailFooter;
export default MathTextbookDetailFooter;
