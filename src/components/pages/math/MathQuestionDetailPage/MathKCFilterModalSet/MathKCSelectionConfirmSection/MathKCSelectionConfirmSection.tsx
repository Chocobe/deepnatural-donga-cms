// react
import { 
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuX,
} from 'react-icons/lu';
// type
import { 
  TKC1SelectionMapper,
} from '../MathKCSelectionSection/MathKCSelectionSection.type';
// style
import './MathKCSelectionConfirmSection.css';

type TMathKCSelectionConfirmSectionProps = {
  kc1SelectionConfirmMapper: TKC1SelectionMapper;

  deleteKC1SelectionConfirm: (kc1Id: string) => void;
  deleteKC2SelectionConfirm: (
    kc1Id: string,
    kc2Id: string,
  ) => void;
};

function _MathKCSelectionConfirmSection(props: TMathKCSelectionConfirmSectionProps) {
  const {
    kc1SelectionConfirmMapper,

    deleteKC1SelectionConfirm,
    deleteKC2SelectionConfirm,
  } = props;

  return (
    <div className="MathKCSelectionConfirmSection">
      <div className="MathKCSelectionConfirmSection-description">
        선택하신 KC 리스트 입니다.
        <br />
        아래 해당 항목만 적용이 됩니다.
      </div>

      <div className="MathKCSelectionConfirmSection-groupList">
        {Object
          .values(kc1SelectionConfirmMapper)
          .filter(kc1Selection => {

            return !!kc1Selection.checked;
          })
          .map(kc1Selection => {
            const {
              id,
              title,
            } = kc1Selection.kc1;

            return (
              <div
                key={`confirm-${id}-${title}`}
                className="group">
                <div className="kc1Wrapper">
                  <div className="kc1Title">
                    {title}
                  </div>

                  <Button
                    className="deleteButton"
                    variant="outline"
                    onClick={() => deleteKC1SelectionConfirm(String(id))}
                  >
                    <LuX className="w-4 h-4" />
                  </Button>
                </div>

                <div className="kc2List">
                  {Object
                    .values(kc1Selection.kc2SelectionMapper)
                    .map(kc2Selection => {
                      const {
                        kc2,
                      } = kc2Selection;

                      return (
                        <div 
                          key={`selection-${id}-${kc2.id}-${kc2.title}`}
                          className="kc2Wrapper">
                          <div className="kc2Title">
                            {kc2.title}
                          </div>

                          <Button
                            className="deleteButton"
                            variant="outline"
                            onClick={() => deleteKC2SelectionConfirm(String(id), String(kc2.id))}
                          >
                            <LuX className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const MathKCSelectionConfirmSection = memo(_MathKCSelectionConfirmSection);
export default MathKCSelectionConfirmSection;
