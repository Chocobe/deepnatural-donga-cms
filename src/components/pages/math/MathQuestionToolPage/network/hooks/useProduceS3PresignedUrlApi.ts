// react
import {
  useCallback,
} from 'react';
// type
import { 
  TProduceS3PresignedUrlApiRequestParams,
} from '@/apis/mathOCR/mathOCRApi.type';
// API
import ApiManager from '@/apis/ApiManager';

const useProduceS3PresignedUrlApi = () => {
  //
  // callback
  //
  const produceS3PresignedUrl = useCallback((
    params: TProduceS3PresignedUrlApiRequestParams
  ) => {
    return ApiManager
      .mathOCR
      .produceS3PresignedUrl
      .callWithNoticeMessageGroup(params);
  }, []);

  return {
    produceS3PresignedUrl,
  };
};

export default useProduceS3PresignedUrlApi;
