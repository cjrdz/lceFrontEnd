// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import vercel from '@astrojs/vercel';

// Vercel sets VERCEL=1 in its build environment; everything else deploys to Cloudflare Workers.
const adapter = process.env.VERCEL ? vercel() : cloudflare({ imageService: 'passthrough' });

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter,
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()],
  },
});
