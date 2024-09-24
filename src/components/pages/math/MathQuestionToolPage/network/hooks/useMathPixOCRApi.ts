// react
import {
  useCallback,
} from 'react';
// type
import { 
  TProduceMathPixOCRApiRequestParams,
} from '@/apis/mathOCR/mathOCRApi.type';
import ApiManager from '@/apis/ApiManager';

const useMathPixOCRApi = () => {
  //
  // callback
  //
  const produceMathPixOCR = useCallback(async (src: string) => {
    const payload: TProduceMathPixOCRApiRequestParams = {
      payload: {
        src,
      },
    };

    return ApiManager
      .mathOCR
      .produceMathPixOCR(payload);
  }, []);

  return {
    produceMathPixOCR,
  };
};

export default useMathPixOCRApi;
