// react
import {
  useState,
  useCallback,
} from 'react';

const useMathQuestionDetailCollapseButton = () => {
  //
  // state
  //
  const [isShow, setIsShow] = useState(false);

  //
  // callback
  //
  const toggleCollapse = useCallback(() => {
    setIsShow(isShow => !isShow);
  }, []);

  return {
    isShow,
    toggleCollapse,
  };
};

export default useMathQuestionDetailCollapseButton;
