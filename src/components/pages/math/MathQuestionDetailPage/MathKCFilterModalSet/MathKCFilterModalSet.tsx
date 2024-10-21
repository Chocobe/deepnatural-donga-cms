// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react';
// api
import ApiManager from '@/apis/ApiManager';
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
import MathKCSelectionSection from './MathKCSelectionSection/MathKCSelectionSection';
import MathKCSelectionConfirmSection from './MathKCSelectionConfirmSection/MathKCSelectionConfirmSection';
// icon
import { 
  LuChevronRight,
} from 'react-icons/lu';
// type
import { 
  TMathAchievement3Model, 
  TMathKnowledgeConcept1Model, 
} from '@/apis/models/mathModel.type';
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TKC1Selection, 
  TKC1SelectionMapper,
} from './MathKCSelectionSection/MathKCSelectionSection.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathKCFilterModalSet.css';

type TMathKCFilterModalSetProps = {
  onChangeKC2: (kc1SelectionConfirmMapper: TKC1SelectionMapper) => void;
};

function _MathKCFilterModalSet(props: TMathKCFilterModalSetProps) {
  const {
    onChangeKC2,
  } = props;

  //
  // state
  //
  const [isOpenKCFilterModal, setIsOpenKCFilterModal] = useState(false);
  const [kc1List, setKC1List] = useState<TMathKnowledgeConcept1Model[]>([]);
  const [kc1SelectionMapper, setKC1SelectionMapper] = useState<TKC1SelectionMapper>({});
  const [kc1SelectionConfirmMapper, setKC1SelectionConfirmMapper] = useState<TKC1SelectionMapper>({});

  //
  // cache
  //
  const displayValue = useMemo(() => {
    return Object
      .values(kc1SelectionConfirmMapper)
      .flatMap(kc1Selection => {
        return Object
          .values(kc1Selection.kc2SelectionMapper)
          .map(kc2Selection => kc2Selection.kc2.title);
      })
      .join(', ');
  }, [kc1SelectionConfirmMapper]);

  //
  // callback
  //
  const openKCFilterModal = useCallback(() => {
    setIsOpenKCFilterModal(true);
  }, []);

  const closeKCFilterModal = useCallback(() => {
    setKC1List([]);
    setKC1SelectionMapper({});
    setIsOpenKCFilterModal(false);
  }, []);

  const clearKCList = useCallback(() => {
    setKC1List([]);
  }, []);

  const retrieveKCList = useCallback(async (
    achievement3: TMathAchievement3Model | null
  ) => {
    if (!achievement3) {
      setKC1List([]);

      return;
    }

    const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
      searchParams: {
        achievement3_id: achievement3.id,
        pagination: false,
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathKnowledgeConceptsNonPaginationApi
      .callWithNoticeMessageGroup(params);

    const kc1List = response?.data ?? [];
    setKC1List(kc1List);
  }, []);

  const resetKC1SelectionMapper = useCallback(() => {
    if (!kc1List?.length) {
      setKC1SelectionMapper({});

      return;
    }

    const selectionMapper = kc1List.reduce((mapper, kc1) => {
      return {
        ...mapper,
        [kc1.id]: {
          checked: false,
          kc1,
          kc2SelectionMapper: kc1.kc2_set.reduce((kc2Mapper, kc2) => ({
            ...kc2Mapper,
            [kc2.id]: {
              checked: false,
              kc2,
            },
          }), {} as TKC1Selection['kc2SelectionMapper'])
        },
      } as {
        [kc1Id: string]: TKC1Selection;
      };
    }, {} as {
      [kc1Id: string]: TKC1Selection;
    });

    setKC1SelectionMapper(selectionMapper);
  }, [kc1List]);

  const addKC1SelectionMapper = useCallback(() => {
    setKC1SelectionConfirmMapper(old => {
      const newKC1SelectionConfirmMapper = { ...old };

      Object
        .values(kc1SelectionMapper)
        .filter(kc1Selection => kc1Selection.checked)
        .forEach(kc1Selection => {
          Object
            .values(kc1Selection.kc2SelectionMapper)
            .filter(kc2Selection => kc2Selection.checked)
            .forEach(kc2Selection => {
              if (!newKC1SelectionConfirmMapper[kc1Selection.kc1.id]) {
                newKC1SelectionConfirmMapper[kc1Selection.kc1.id] = {
                  checked: kc1Selection.checked,
                  kc1: kc1Selection.kc1,
                  kc2SelectionMapper: {},
                } as TKC1Selection;
              }

              newKC1SelectionConfirmMapper[kc1Selection.kc1.id] = {
                ...newKC1SelectionConfirmMapper[kc1Selection.kc1.id],
                kc2SelectionMapper: {
                  ...newKC1SelectionConfirmMapper[kc1Selection.kc1.id].kc2SelectionMapper,
                  [kc2Selection.kc2.id]: kc2Selection,
                },
              };
            });
        });

      return newKC1SelectionConfirmMapper;
    });

    resetKC1SelectionMapper();
  }, [
    kc1SelectionMapper,
    resetKC1SelectionMapper,
  ]);

  const deleteKC1SelectionConfirm = useCallback((kc1Id: string) => {
    setKC1SelectionConfirmMapper(old => {
      const newKC1SelectionConfirmMapper = {
        ...old,
      };

      delete newKC1SelectionConfirmMapper[kc1Id];

      return newKC1SelectionConfirmMapper;
    });
  }, []);

  const deleteKC2SelectionConfirm = useCallback((
    kc1Id: string,
    kc2Id: string
  ) => {
    setKC1SelectionConfirmMapper(old => {
      const newKC1SelectionConfirmMapper = {
        ...old,
      };

      delete newKC1SelectionConfirmMapper[kc1Id].kc2SelectionMapper[kc2Id];

      if (!Object.values(newKC1SelectionConfirmMapper[kc1Id].kc2SelectionMapper).length) {
        delete newKC1SelectionConfirmMapper[kc1Id];
      }

      return newKC1SelectionConfirmMapper;
    });
  }, []);

  const onClickSave = useCallback(() => {
    onChangeKC2(kc1SelectionConfirmMapper);
    closeKCFilterModal();
  }, [
    kc1SelectionConfirmMapper,
    onChangeKC2,
    closeKCFilterModal,
  ]);

  //
  // effect
  //
  useEffect(() => {
    resetKC1SelectionMapper();
  }, [resetKC1SelectionMapper]);

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
          value={displayValue}
          isShowSearchIcon
          onOpen={openKCFilterModal} />
      </DialogTrigger>

      <div>
        <DialogContent 
          className="MathKCFilterModalSet"
          hideCloseButton>
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
              <MathKCFilterModalSetFilters 
                clearKCList={clearKCList}
                retrieveKCList={retrieveKCList} />
            </div>

            <div className="innerWrapper">
              <div className="selectionSection">
                <MathKCSelectionSection 
                  kc1List={kc1List}
                  kc1SelectionMapper={kc1SelectionMapper}
                  setKC1SelectionMapper={setKC1SelectionMapper} />
              </div>

              <div className="actionSection">
                <Button
                  className="w-9 h-9 p-0"
                  variant="secondary"
                  onClick={addKC1SelectionMapper}>
                  <LuChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="resultSection">
                <MathKCSelectionConfirmSection
                  kc1SelectionConfirmMapper={kc1SelectionConfirmMapper}
                  // setKC1SelectionConfirmMapper={setKC1SelectionConfirmMapper}
                  deleteKC1SelectionConfirm={deleteKC1SelectionConfirm}
                  deleteKC2SelectionConfirm={deleteKC2SelectionConfirm}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="MathKCFilterModalSet-footer">
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
