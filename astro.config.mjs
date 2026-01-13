import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        // Vercel Serverless supported runtimes: nodejs22.x, nodejs20.x
        runtime: 'nodejs22.x',
    }),
    integrations: [
        react(),
        vue(),
        svelte(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
});
