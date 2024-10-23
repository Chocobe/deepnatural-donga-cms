// react
import {
  useCallback,
} from 'react';
// type
import { 
  TUploadFileToS3ApiRequestParams,
} from '@/apis/mathOCR/mathOCRApi.type';
// api
import ApiManager from '@/apis/ApiManager';

const useUploadFileToS3Api = () => {
  //
  // callback
  //
  const uploadFileToS3 = useCallback((
    params: TUploadFileToS3ApiRequestParams
  ) => {
    return ApiManager
      .mathOCR
      .uploadFileToS3
      .callWithNoticeMessageGroup(params);
  }, []);

  return {
    uploadFileToS3,
  };
};

export default useUploadFileToS3Api;
