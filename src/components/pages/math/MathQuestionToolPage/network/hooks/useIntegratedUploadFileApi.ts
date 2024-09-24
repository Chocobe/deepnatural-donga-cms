// react
import {
  useCallback,
} from 'react';
// hook
import useProduceS3PresignedUrlApi from './useProduceS3PresignedUrlApi';
import useUploadFileToS3Api from './useUploadFileToS3Api';
// type
import { 
  TUploadFileToS3ApiRequestParams,
} from '@/apis/mathOCR/mathOCRApi.type';

const useIntegratedUploadFileApi = () => {
  //
  // hook
  //
  const { 
    produceS3PresignedUrl,
  } = useProduceS3PresignedUrlApi();

  const { 
    uploadFileToS3,
  } = useUploadFileToS3Api();

  //
  // callback
  //
  const uploadFile = useCallback(async (
    questionId: string,
    objectURL: string
  ) => {
    try {
      const blob = await (await fetch(objectURL, {
        method: 'get',
      })).blob();

      const extension = blob.type.match(/.*\/(.*)$/)?.[1];

      if (!extension) {
        console.log('파일 확장자 추출 실패');
        return Promise.reject({});
      }

      // 1. (BE) PresignedUrl 생성 요청
      const responseForPresignedUrl = await produceS3PresignedUrl({
        payload: {
          questionId,
          extension,
        },
      });

      if (!responseForPresignedUrl?.data) {
        return;
      }

      const {
        url,
        fields: {
          key: filename,
        },
      } = responseForPresignedUrl.data;

      const file = new File([blob], filename);

      if (!file) {
        console.log('파일 생성 실패');
        return Promise.reject({});
      }

      // // 2. (AWS S3) File 업로드
      const payload: TUploadFileToS3ApiRequestParams = {
        payload: {
          ...responseForPresignedUrl.data,
          file,
        },
      };

      await uploadFileToS3(payload);

      return {
        file,
        fileUrl: `${url}${filename}`,
      };
    } catch(error) {
      console.group('onFailure - uploadFile()');
      console.log('error: ', error);
      console.groupEnd();
    }
  }, [produceS3PresignedUrl, uploadFileToS3]);

  return {
    uploadFile,
  };
};

export default useIntegratedUploadFileApi;
