interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_USE_MOCK_DATA: string;
    readonly VITE_SITE_NAME: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}