import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_DEFAULTS, webDevelopmentPages, brandingPages } from './site-pages';
import { flatSlug } from './src/i18n/routes';

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
    server: {
      proxy: {
        '/api/contact': 'http://127.0.0.1:8787',
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  // Adresses : /work, /process → /projets, /methode (fr) ; projets sans sous-dossier (/projets/<projet>, /en/work/<projet>).
  // Les anciennes adresses restent valides et redirigent.
  redirects: {
    '/work': '/projets',
    '/process': '/methode',
    '/work/web-development': '/projets',
    '/work/branding': '/projets',
    '/en/work/web-development': '/en/work',
    '/en/work/branding': '/en/work',
    '/work/web-development/boda-natalia-y-mauricio': '/projets',
    '/en/work/web-development/boda-natalia-y-mauricio': '/en/work',
    ...Object.fromEntries(
      [
        ...Object.entries(webDevelopmentPages).map(([slug, page]) => ({ kind: 'web-development' as const, slug, page })),
        ...Object.entries(brandingPages).map(([slug, page]) => ({ kind: 'branding' as const, slug, page })),
      ].flatMap(({ kind, slug, page }) => [
        [page.path, `/projets/${flatSlug(kind, slug)}`],
        [`/en${page.path}`, `/en/work/${flatSlug(kind, slug)}`],
      ]),
    ),
  },
});
