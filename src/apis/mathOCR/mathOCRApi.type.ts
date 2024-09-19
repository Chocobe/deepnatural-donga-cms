// type
import { 
  TApiRequestBodyParams,
} from '../api.type';

//
// retrieveMathPixAppKey
//
export type TRetrieveMathPixAppKeyApiResponse = {
  app_id: string;
  app_key: string;
};

//
// produceMathPixAppToken
//
export type TProduceMathPixAppTokenApiResponse = {
  appToken: string;
  appTokenExpiresAt: string;
};

//
// produceMathPixOCR
//
export type TProduceMathPixOCRApiRequestParams = TApiRequestBodyParams<void, void, {
  src: string;
}>;
export type TProduceMathPixOCRApiResponse = {
  autoRotateConfidence: number;
  autoRotateDegrees: number;
  confidence: number;
  confidenceRate: number;
  isHandwritten: boolean;
  isPrinted: boolean;
  requestId: string;
  text: string;
  version: 'RSK-M100';
};

//
// produceS3PresignedUrl
//
export type TProduceS3PresignedUrlApiRequestParams = TApiRequestBodyParams<void, void, {
  questionId: string;
  extension: string;
}>;

export type TProduceS3PresignedUrlApiResponse = {
  fields: {
      key: string;
      policy: string;
      'x-amz-algorithm': string;
      'x-amz-credential': string;
      'x-amz-date': string;
      'x-amz-security-token': string;
      'x-amz-signature': string;
  };
  url: string;
};

//
// uploadFileToS3
//
export type TUploadFileToS3ApiRequestParams = TApiRequestBodyParams<
  void, 
  void, 
  TProduceS3PresignedUrlApiResponse & {
    presignedUrl: string;
    file: File;
  }
>;
// export type TUploadFileToS3ApiPayload = TProduceS3PresignedUrlApiResponse & {
//   file: File;
// };

export type TUploadFileToS3ApiResponse = any;
