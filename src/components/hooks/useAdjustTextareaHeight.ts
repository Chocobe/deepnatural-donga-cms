// react
import {
  useCallback,
} from 'react';

const useAdjustTextareaHeight = (
  minHeight = 80
) => {
  //
  // callback
  //
  const adjustTextareaHeight = useCallback((
    $textarea: HTMLTextAreaElement | null
  ) => {
    if (!$textarea) {
      return;
    }

    $textarea.style.height = '0';

    const scrollHeight = $textarea.scrollHeight + 2;
    $textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
  }, [minHeight]);

  return {
    adjustTextareaHeight,
  };
};

export default useAdjustTextareaHeight;
