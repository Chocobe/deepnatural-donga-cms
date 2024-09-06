// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuPlus, 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  initialMathChapterPageStoreDetailChapter2,
} from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore.type';
// style
import './MathChapterFooter.css';

function _MathChapterDetailFooter() {
  //
  // mathChapterPage store
  //
  const updateDetailFormState = useMathChapterPageStore(state => state.updateDetailFormState);

  //
  // cache
  //
  const rightSideButtons = useMemo(() => [
    {
      text: '저장후 추가하기',
      variant: 'secondary',
      onClick: () => {
        console.log('저장후 추가하기');
      },
      IconComponent: undefined,
    },
    {
      text: '저장후 계속해서 수정하기',
      variant: 'secondary',
      onClick: () => {
        console.log('저장후 계속해서 수정하기');
      },
      IconComponent: undefined,
    },
    {
      text: '저장하기',
      variant: 'default',
      onClick: () => {
        console.log('저장하기');
      },
      IconComponent: LuSave,
    },
  ], []);

  //
  // callback
  //
  const addMathChapter2 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      chapter2_set: [
        ...(old.chapter2_set ?? []),
        {
          ...initialMathChapterPageStoreDetailChapter2,
        },
      ],
    }));
  }, [updateDetailFormState]);

  return (
    <div className="MathChapterFooter">
      <div className="MathChapterFooter-leftSide">
        <Button
          className="button"
          variant="default"
          onClick={addMathChapter2}>
          <LuPlus className="icon" />
          교과서 단원(중)
        </Button>
      </div>

      <div className="MathChapterFooter-rightSide">
        {rightSideButtons.map((item, index) => {
          const {
            text,
            variant,
            onClick,
            IconComponent,
          } = item;

          return (
            <Button
              key={index}
              className="button"
              variant={variant as ButtonProps['variant']}
              onClick={onClick}>
              {IconComponent && (
                <IconComponent className="icon" />
              )}

              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

const MathChapterDetailFooter = memo(_MathChapterDetailFooter);
export default MathChapterDetailFooter;
