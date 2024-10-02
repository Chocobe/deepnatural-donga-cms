// util
import createApiWithNoticeMessageGroup from '@/utils/createApiWithNoticeMessageGroup';
import api from '../api';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
import { 
  TProduceMathPixAppTokenApiResponse,
  TProduceMathPixOCRApiRequestParams,
  TProduceMathPixOCRApiResponse,
  TProduceS3PresignedUrlApiRequestParams,
  TProduceS3PresignedUrlApiResponse, 
  TRetrieveMathPixAppKeyApiResponse,
  TUploadFileToS3ApiRequestParams,
  TUploadFileToS3ApiResponse,
} from './mathOCRApi.type';
import mathOCRUrlFactory from './mathOCRUrlFactory';

/**
 * MathPix APP_ID 와 APP_KEY 를 조회 합니다. (MathPix auth_token 발급 시 필요한 정보)
 * 
 * 해당 정보는 CMS 에서 관리하는 데이터입니다.
 * 
 * {@link https://www.notion.so/deepnatural/CMS-API-9b19aeb0f13540a38f40d423cd4da561?pvs=4 MathPix APP_ID, APP_KEY 조회 API 문서}
 */
export const retrieveMathPixAppKey = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return api.get<TRetrieveMathPixAppKeyApiResponse>(
      mathOCRUrlFactory.retrieveMathPixAppKey()
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathOCR
    .retrieveMathPixAppKey,
});

/**
 * (MathPix) auth_token 을 발급 받습니다.
 * {@link https://docs.mathpix.com/#using-server-side-api-keys MathPix API 공식 문서}
 */
export const produceMathPixAppToken = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return api.post<TProduceMathPixAppTokenApiResponse>(
      mathOCRUrlFactory.produceMathPixAppToken()
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathOCR
    .produceMathPixAppToken
});

/**
 * (MathPix) image => LaTeX 로 OCR 처리합니다.
 * {@link https://docs.mathpix.com/#using-server-side-api-keys MathPix API 공식 문서}
 */
export const produceMathPixOCR = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathPixOCRApiRequestParams) => {
    const {
      payload,
    } = params;

    return api.post<TProduceMathPixOCRApiResponse>(
      mathOCRUrlFactory.produceMathPixOCR(),
      {
        src: payload.src,
        math_inline_delimiters: ['$', '$'],
        math_display_delimiters: ['$$', '$$'],
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathOCR
    .produceMathPixOCR,
});



// 
// ---
// 



/**
 * 파일 업로드를 위한 S3 presignedUrl 생성을 요청합니다.
 * 
 * {@link https://www.notion.so/deepnatural/Donga-CMS-API-b68faefa5d3040d88de5cb082a18517e?pvs=4#6a7dc3f8461248b6afd872181cd96860 S3 presignedUrl 생성 API 문서}
 */
export const produceS3PresignedUrl = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceS3PresignedUrlApiRequestParams) => {
    const {
      payload,
    } = params;

    return api.post<TProduceS3PresignedUrlApiResponse>(
      mathOCRUrlFactory.produceS3PresignedUrl(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathOCR
    .produceS3PresignedUrl
});

/**
 * S3 presignedUrl 에 File 을 업로드 합니다.
 */
export const uploadFileToS3 = createApiWithNoticeMessageGroup({
  apiFunction: (params: TUploadFileToS3ApiRequestParams) => {
    const {
      payload: {
        url,
        fields,
        file,
      },
    } = params;

    const formData = new FormData();

    Object
      .entries(fields)
      .forEach(([key, value]) => {
        formData.append(key, value);
      });

    formData.append('file', file);
    formData.append('Content-Type', file.type);

    return api.post<TUploadFileToS3ApiResponse>(
      url,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathOCR
    .uploadFileToS3
});
