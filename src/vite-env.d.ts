/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRODUCTION_API_BASE_URL: string;
  readonly VITE_DEVELOPMENT_API_BASE_URL: string;
  readonly VITE_CMS_API_PATH: string;

  readonly VITE_AWS_S3_API_BASE_URL: string;
  readonly VITE_MATH_PIX_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
