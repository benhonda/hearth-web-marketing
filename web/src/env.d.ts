/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CDV2_EMAIL_API_KEY: string;
  readonly CDV2_EMAIL_BASE_URL: string;
  readonly CDV2_FROM_ADDRESS: string;
  readonly CDV2_NOTIFY_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
