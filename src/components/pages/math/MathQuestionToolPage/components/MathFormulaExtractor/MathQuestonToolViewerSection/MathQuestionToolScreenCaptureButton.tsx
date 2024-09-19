// react
import {
  memo,
  PropsWithChildren,
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// style
import './MathQuestionToolScreenCaptureButton.css';

type TMathQuestionToolScreenCaptureButtonProps = PropsWithChildren<{
    onScreenCapture: (screenCapture: string) => void;
}>;

function _MathQuestionToolScreenCaptureButton(props: TMathQuestionToolScreenCaptureButtonProps) {
  const {
    onScreenCapture,
    children,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const targetElementState = useMathQuestionToolPageStore(state => state.ui.state.targetElementState);
  const disabled = !targetElementState.id;

  //
  // callback
  //
  const onClick = useCallback(() => {
    onScreenCapture('onScreenCapture()');
  }, [onScreenCapture]);

  return (
    <button
      className="MathQuestionToolScreenCaptureButton"
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}

const MathQuestionToolScreenCaptureButton = memo(_MathQuestionToolScreenCaptureButton);
export default MathQuestionToolScreenCaptureButton;
