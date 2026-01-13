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
        // Vercel Serverless supported runtimes: nodejs20.x (stable)
        runtime: 'nodejs20.x',
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
