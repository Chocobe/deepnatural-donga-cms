// react
import {
  useState,
  useCallback,
  memo,
} from 'react';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import MathKCFilterModalSetFilters from './MathKCFilterModalSetFilters/MathKCFilterModalSetFilters';
// type
import { 
  TMathAchievement3Model, 
  TMathKnowledgeConcept1Model,
} from '@/apis/models/mathModel.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathKCFilterModalSet.css';

// FIXME: mockup
import mockKC1List from './MathKCFilterModalSetFilters/mockKCList';

function _MathKCFilterModalSet() {
  //
  // state
  //
  const [isOpenKCFilterModal, setIsOpenKCFilterModal] = useState(false);
  const [_mathKCList, setMathKCList] = useState<TMathKnowledgeConcept1Model[]>([]);

  // FIXME: mockup - props로 받아오기
  const [value, _setValue] = useState('');

  //
  // callback
  //
  const openKCFilterModal = useCallback(() => {
    setIsOpenKCFilterModal(true);
  }, []);

  const closeKCFilterModal = useCallback(() => {
    setIsOpenKCFilterModal(false);
  }, []);

  // FIXME: mockup - API 연동하기
  const retrieveKCList = useCallback(async (
    _achievement3: TMathAchievement3Model | null
  ) => {
    const response = await new Promise<{ data: typeof mockKC1List }>(res => {
      setTimeout(() => {
        res({
          data: mockKC1List,
        });
      }, 1_000);
    });

    const data = response.data;
    setMathKCList(data.results);

    return data;
  }, []);

  const onClickSave = useCallback(() => {
    console.log('onClickSave()');

    closeKCFilterModal();
  }, [closeKCFilterModal]);

  return (<>
    <div className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      isOpenKCFilterModal ? 'block' : 'hidden'
    )} />
    <Dialog
      modal={false}
      open={isOpenKCFilterModal}>
      <DialogTrigger asChild>
        <SearchModalTrigger
          id="kcFilter"
          value={value}
          isShowSearchIcon
          onOpen={openKCFilterModal} />
      </DialogTrigger>

      <div>
        <DialogContent 
          className="MathKCFilterModalSet">
          <DialogHeader className="MathKCFilterModalSet-header">
            <DialogTitle className="title">
              KC 필터링
            </DialogTitle>

            <DialogDescription className="description">
              학교급, 학년, 학기 선택 한 내용들의 하위 내용을 선택할 수 있습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="MathKCFilterModalSet-main">
            <div className="filtersWrapper">
              <MathKCFilterModalSetFilters retrieveKCList={retrieveKCList} />
            </div>

            {/* TODO: kcList 넘겨주는 컴포넌트 만들기 */}
            <div className="innerWrapper">
              <div className="selectionSection">
                SelectionSection
              </div>

              <div className="actionSection">
                Action
              </div>

              <div className="resultSection">
                ResultSection
              </div>
            </div>
          </div>

          <DialogFooter className="MathKCFilterModalSet-footer">
            <Button
              className="button"
              onClick={closeKCFilterModal}
              variant="outline">
              취소
            </Button>

            <Button
              className="button"
              onClick={onClickSave}
              variant="default">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  </>);
}

const MathKCFilterModalSet = memo(_MathKCFilterModalSet);
export default MathKCFilterModalSet;
