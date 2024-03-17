/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly ASTRO_APP_HYGRAPH_ENDPOINT: string;
    readonly ASTRO_APP_DEBUG: boolean;
}