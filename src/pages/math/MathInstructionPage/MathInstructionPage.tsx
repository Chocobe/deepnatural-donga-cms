// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathInstructionPageStore from '@/store/mathStores/mathInstructionPageStore/mathInstructionPageStore';
// ui
import MathInstructionHeader from '@/components/pages/math/MathInstrurctionPage/MathInstructionHeader/MathInstructionHeader';
import MathInstructionTableActions from '@/components/pages/math/MathInstrurctionPage/MathInstructionTableActions/MathInstructionTableActions';
import MathInstructionTable from '@/components/pages/math/MathInstrurctionPage/MathInstructionTable/MathInstructionTable';
import MathInstructionFooter from '@/components/pages/math/MathInstrurctionPage/MathInstructionFooter/MathInstructionFooter';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  TRetrieveMathInstructionsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathInstructionPage.css';

function MathInstructionPage() {
  //
  // mathInstructionPage store
  //
  const searchParamsForRetrieveMathInstructionsApi = useMathInstructionPageStore(state => state.searchParamsForRetrieveMathInstructionsApi);

  const setMathInstructionsData = useMathInstructionPageStore(state => state.setMathInstructionsData);
  const clearMathInstructionsData = useMathInstructionPageStore(state => state.clearMathInstructionsData);
  const clearSelectedMathInstructions = useMathInstructionPageStore(state => state.clearSelectedMathInstructions);

  //
  // callback
  //
  const retrieveMathInstructions = useCallback(async (
    params: TRetrieveMathInstructionsApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathInstructionsApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathInstructionsData(response.data);
    }
  }, [setMathInstructionsData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathInstructions({
      searchParams: searchParamsForRetrieveMathInstructionsApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathInstructions]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathInstructions();
      clearMathInstructionsData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathInstructions]);

  return (
    <div className="MathInstructionPage">
      <div className="MathInstructionPage-header">
        <MathInstructionHeader />
      </div>

      <div className="MathInstructionPage-actions">
        <MathInstructionTableActions />
      </div>

      <div className="MathInstructionPage-table">
        <MathInstructionTable />
      </div>

      <div className="MathInstructionPage-footer">
        <MathInstructionFooter retrieveMathInstructions={retrieveMathInstructions} />
      </div>
    </div>
  );
}

export default MathInstructionPage;
