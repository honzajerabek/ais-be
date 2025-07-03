declare module NodeJS {
    interface ProcessEnv {
        SERVER_PORT: string;
        POSTGRES_HOST: string;
        POSTGRES_PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
        AIS_STREAM_API_KEY: string;
        AIS_STREAM_API_URL: string;
    }
}
