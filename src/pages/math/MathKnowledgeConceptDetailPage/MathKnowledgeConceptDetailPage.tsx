// react
import {
  useCallback,
  useEffect,
} from 'react';
// router
import { 
  useParams,
} from 'react-router-dom';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathKnowledgeConceptDetailHeader from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailHeader/MathKnowledgeConceptDetailHeader';
import MathKnowledgeConcept1 from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConcept1/MathKnowledgeConcept1';
import MathKnowledgeConceptDetailFooter from '@/components/pages/math/MathKnowledgeConceptDetailPage/MathKnowledgeConceptDetailFooter/MathKnowledgeConceptDetailFooter';
// type
import { 
  TRetrieveMathKnowledgeConceptApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptDetailPage.css';

function MathKnowledgeConceptDetailPage() {
  //
  // mathKnowledgeConceptPage store
  //
  const setDetailTargetMathKnowledgeConcept = useMathKnowledgeConceptPageStore(state => state.setDetailTargetMathKnowledgeConcept);
  const clearDetailTargetMathKnowledgeConcept = useMathKnowledgeConceptPageStore(state => state.clearDetailTargetMathKnowledgeConcept);

  //
  // hook
  //
  const routeParams = useParams();
  const kc1Id = routeParams.kc1Id;
  // FIXME: PUT KC API 연동 시, 주석 해제
  // const isDetailMode = !!kc1Id;

  //
  // callback
  //
  const retrieveMathKnowledgeConcept = useCallback(async () => {
    if (!kc1Id) {
      return;
    }

    const params: TRetrieveMathKnowledgeConceptApiRequestParams = {
      pathParams: {
        kc1Id,
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathKnowledgeConceptApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setDetailTargetMathKnowledgeConcept(response.data);
    }
  }, [
    kc1Id,
    setDetailTargetMathKnowledgeConcept,
  ]);

  //
  // effect
  //
  useEffect(function _retrieveMathKnowledgeConcept() {
    retrieveMathKnowledgeConcept();
  }, [retrieveMathKnowledgeConcept]);

  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathKnowledgeConcept();
    };
  }, [clearDetailTargetMathKnowledgeConcept]);

  return (
    <div className="MathKnowledgeConceptDetailPage">
      <div className="MathKnowledgeConceptDetailPage-header">
        <MathKnowledgeConceptDetailHeader />
      </div>

      <div className="MathKnowledgeConceptDetailPage-divider" />

      <div className="MathKnowledgeConceptDetailPage-main">
        <MathKnowledgeConcept1 />
      </div>

      <div className="MathKnowledgeConceptDetailPage-divider" />

      <div className="MathKnowledgeConceptDetailPage-footer">
        <MathKnowledgeConceptDetailFooter />
      </div>
    </div>
  );
}

export default MathKnowledgeConceptDetailPage;
