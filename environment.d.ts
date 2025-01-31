namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    DATABASE_URL_DIGITAL_TWIN: string;
    DATABASE_URL_EMPLOYMENT: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    SELF_URL: string;
    GOPRO_URL: string;
    MODE: 'development' | 'production';
  }
}
