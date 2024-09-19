const mathOCRUrlFactory = (() => {
  // const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;
  const AWS_S3_BASE_URL = import.meta.env.VITE_AWS_S3_API_BASE_URL;
  const MATH_PIX_BASE_URL = import.meta.env.VITE_MATH_PIX_API_BASE_URL;

  return {
    produceS3PresignedUrl() {
      return `${AWS_S3_BASE_URL}/Prod/upload/`;
    },

    retrieveMathPixAppKey() {
      return `/mathpix/settings/`;
    },

    produceMathPixAppToken() {
      return `${MATH_PIX_BASE_URL}/v3/app-tokens`;
    },

    produceMathPixOCR() {
      return `${MATH_PIX_BASE_URL}/v3/text`;
    },
  } as const;
})();

export default mathOCRUrlFactory;
