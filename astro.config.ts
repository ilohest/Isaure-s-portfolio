import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import { imagetools } from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';
import { SITE_DEFAULTS } from './site-pages';

const site = process.env.NUXT_PUBLIC_SITE_URL || SITE_DEFAULTS.siteUrl;

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  // Conserve la navigation type SPA (smooth-scroll shell persistant) via View Transitions.
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss(), imagetools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  // Porté depuis nuxt.config.ts > nitro.routeRules
  redirects: {
    '/achievements/web-developement': '/achievements',
    '/achievements/branding': '/achievements',
    '/achievements/web-developement/boda-natalia-y-mauricio': '/achievements',
  },
});
