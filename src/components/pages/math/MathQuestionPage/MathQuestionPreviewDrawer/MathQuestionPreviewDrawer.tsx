// react
import {
  // useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// ui
import { 
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/ui/drawer';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
// mathjax
import { 
  MathJax,
} from 'better-react-mathjax';
// type
import { 
  mathQuestionPreviewDrawerContentTemplates,
} from './MathQuestionPreviewDrawer.type';
// style
import './MathQuestionPreviewDrawer.css';

function _MathQuestionPreviewDrawer() {
  //
  // mathQuestionPage store
  //
  const previewMathQuestion = useMathQuestionPageStore(state => state.previewMathQuestion);
  const isOpen = !!previewMathQuestion;

  const clearPreviewMathQuestion = useMathQuestionPageStore(state => state.clearPreviewMathQuestion);

  //
  // callback
  //
  const closeMathQuestionDrawer = useCallback(() => {
    if (isOpen) {
      clearPreviewMathQuestion();
    }
  }, [isOpen, clearPreviewMathQuestion]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={closeMathQuestionDrawer}
      data-vaul-no-drag={true}
      direction="right">
      <DrawerTrigger 
        asChild
        hidden />

      <DrawerContent className="MathQuestionPreviewDrawer">
        <div className="MathQuestionPreviewDrawer-wrapper">
          <DrawerHeader className="MathQuestionPreviewDrawer-wrapper-header">
            <DrawerTitle>View</DrawerTitle>
            <DrawerDescription hidden />
          </DrawerHeader>

          <div className="MathQuestionPreviewDrawer-wrapper-content">
            {mathQuestionPreviewDrawerContentTemplates.map(template => {
              if (!previewMathQuestion) {
                return null;
              }

              const {
                label,
                type,
                getIsShow,
                getValue,
              } = template;

              const isShow = getIsShow(previewMathQuestion);
              const valueForDisplay = getValue(previewMathQuestion);

              if (!isShow) {
                return null;
              }

              return (
                <div
                  key={label}
                  className="contentItem">
                  <div className="label">
                    {label}
                  </div>

                  {type === 'boolean'
                    ? (
                      <div className="value valueOfCheckbox">
                        <Checkbox
                          className="checkbox"
                          checked={!valueForDisplay} />

                        <div className="description">
                          개별 출제 문항입니다.
                        </div>
                      </div>
                    ): (
                      <div className="value valueOfMathJax">
                        <MathJax
                          className="mathjax"
                          dynamic
                          dangerouslySetInnerHTML={{
                            __html: valueForDisplay ?? '&nbsp;',
                          }} />
                      </div>
                    )
                  }
                </div>
              );
            })}
          </div>

          <div className="MathQuestionPreviewDrawer-wrapper-footer">
            <Button
              className="closeButton"
              variant="default"
              onClick={closeMathQuestionDrawer}>
              닫기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const MathQuestionPreviewDrawer = memo(_MathQuestionPreviewDrawer);
export default MathQuestionPreviewDrawer;
