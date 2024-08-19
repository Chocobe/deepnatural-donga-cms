// react
import {
  useState,
  useEffect,
  useCallback,
} from 'react';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathTextbookHeader from '@/components/pages/math/MathTextbookPage/MathTextbookHeader/MathTextbookHeader';
import MathTextbookTableActions from '@/components/pages/math/MathTextbookPage/MathTextbookTableActions/MathTextbookTableActions';
import MathTextbookTable from '@/components/pages/math/MathTextbookPage/MathTextbookTable/MathTextbookTable';
import MathTextbookFooter from '@/components/pages/math/MathTextbookPage/MathTextbookFooter/MathTextbookFooter';
// type
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
// style
import './MathTextbookPage.css';

function MathTextbookPage() {
  //
  // state
  //
  const [mathTextbooks, setMathTextbooks] = useState<TMathTextbookModel[]>([]);

  //
  // callback
  //
  const retrieveMathTextbooks = useCallback(async () => {
    const mathTextbooks = await ApiManager
      .math
      .retrieveMathTextbooksApi
      .callWithNoticeMessageGroup();

    if (mathTextbooks) {
      setMathTextbooks(mathTextbooks);
    }
  }, []);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathTextbooks();
  }, [retrieveMathTextbooks]);

  return (
    <div className="MathTextbookPage">
      <div className="MathTextbookPage-header">
        <MathTextbookHeader />
      </div>

      <div className="MathTextbookPage-actions">
        <MathTextbookTableActions />
      </div>

      <div className="MathTextbookPage-table">
        <MathTextbookTable
          data={mathTextbooks} />
      </div>

      <div className="MathTextbookPage-footer">
        <MathTextbookFooter />
      </div>
    </div>
  );
}

export default MathTextbookPage;
