// react
import {
  useRef,
  useEffect,
} from 'react';

const useAutoFocus = <
  TElement extends HTMLElement = HTMLInputElement
>(effectDef: any) => {
  //
  // ref
  //
  const $editorRef = useRef<TElement | null>(null);

  //
  // effect
  //
  useEffect(function focusEditor() {
    $editorRef.current?.focus();
  }, [effectDef]);

  return {
    $editorRef,
  };
};

export default useAutoFocus;
