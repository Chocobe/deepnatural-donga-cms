// react
import {
  useCallback,
  KeyboardEvent,
} from 'react';

const useOnKeyDownEnterOrESC = <TElement extends HTMLElement>(
  onEnter: () => void,
  onESC?: () => void
) => {
  //
  // callback
  //
  const onKeyDown = useCallback((e: KeyboardEvent<TElement>) => {
    const {
      key,
      nativeEvent,
    } = e;

    switch (key.toLowerCase()) {
      case 'enter': {
        if (nativeEvent.isComposing) {
          return;
        }

        e.preventDefault?.();
        onEnter();

        return;
      }

      case 'escape': {
        e.preventDefault?.();
        onESC?.();

        return;
      }
    }
  }, [onEnter, onESC]);

  return {
    onKeyDown,
  };
};

export default useOnKeyDownEnterOrESC;
