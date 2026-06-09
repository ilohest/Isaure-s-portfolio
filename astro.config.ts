import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_DEFAULTS } from './site-pages';

const site = process.env.NUXT_PUBLIC_SITE_URL || SITE_DEFAULTS.siteUrl;

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  // Préchargement des liens au survol — élimine la latence réseau perçue à la navigation.
  // 'hover' = fetch déclenché dès le pointeur sur un lien (bon compromis trafic/vitesse).
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true,
  },
  // Conserve la navigation type SPA (smooth-scroll shell persistant) via View Transitions.
  integrations: [
    vue(),
    sitemap({
      // lastmod = date du build (Google l'exploite ; changefreq/priority sont
      // largement ignorés mais font partie d'un sitemap complet/standard).
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === `${site}/` || item.url === site) item.priority = 1.0;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
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
