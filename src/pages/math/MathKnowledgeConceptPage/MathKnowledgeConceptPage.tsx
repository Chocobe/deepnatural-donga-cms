// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathKnowledgeConceptHeader from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptHeader/MathKnowledgeConceptHeader';
import MathKnowledgeConceptTableActions from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptTableActions/MathKnowledgeConceptTableActions';
import MathKnowledgeConceptTable from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptTable/MathKnowledgeConceptTable';
import MathKnowledgeConceptFooter from '@/components/pages/math/MathKnowledgeConceptPage/MathKnowledgeConceptFooter/MathKnowledgeConceptFooter';
// type
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptPage.css';

function MathKnowledgeConceptPage() {
  //
  // mathKnowledgeConceptPage store
  //
  const searchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.searchParamsForRetrieveMathKnowledgeConceptsApi);

  const setMathKnowledgeConceptsData = useMathKnowledgeConceptPageStore(state => state.setMathKnowledgeConceptsData);
  const clearSelectedMathKnowledgeConcepts = useMathKnowledgeConceptPageStore(state => state.clearSelectedMathKnowledgeConcepts);
  const clearMathKnowledgeConceptsData = useMathKnowledgeConceptPageStore(state => state.clearMathKnowledgeConceptsData);

  //
  // callback
  //
  const retrieveMathKnowledgeConcepts = useCallback(async (
    params: TRetrieveMathKnowledgeConceptsApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathKnowledgeConceptsApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathKnowledgeConceptsData(response.data);
    }
  }, [setMathKnowledgeConceptsData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathKnowledgeConcepts({
      searchParams: searchParamsForRetrieveMathKnowledgeConceptsApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathKnowledgeConcepts]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathKnowledgeConcepts();
      clearMathKnowledgeConceptsData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathKnowledgeConcepts]);

  return (
    <div className="MathKnowledgeConceptPage">
      <div className="MathKnowledgeConceptPage-header">
        <MathKnowledgeConceptHeader />
      </div>

      <div className="MathKnowledgeConceptPage-actions">
        <MathKnowledgeConceptTableActions />
      </div>

      <div className="MathKnowledgeConceptPage-table">
        <MathKnowledgeConceptTable />
      </div>

      <div className="MathKnowledgeConceptPage-footer">
        <MathKnowledgeConceptFooter />
      </div>
    </div>
  );
}

export default MathKnowledgeConceptPage;
