// react
import {
  useState,
  useCallback,
} from 'react';

const useMathQuestionDetailPreviewButton = () => {
  //
  // state
  //
  const [isShowPreview, setIsShowPreview] = useState(false);

  //
  // callback
  //
  const togglePreview = useCallback(() => {
    setIsShowPreview(isShowPreview => !isShowPreview);
  }, []);

  return {
    isShowPreview,
    togglePreview,
  };
};

export default useMathQuestionDetailPreviewButton;
