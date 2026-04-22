import { resolve } from 'node:path';
import { IS_2026_INSPO_ENABLED, PRERENDER_ROUTES, SITE_DEFAULTS } from './site-pages';

process.loadEnvFile?.('.env.local');

const publicSiteUrl = process.env.NUXT_PUBLIC_SITE_URL || SITE_DEFAULTS.siteUrl;
const googleAnalyticsId = process.env.NUXT_PUBLIC_GA_ID || 'G-W874808SC4';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-27',
  ssr: true,
  buildDir: '.nuxt',
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  alias: {
    '@': resolve(__dirname, 'src'),
    'primevue/api': resolve(__dirname, 'node_modules/primevue/api/api.esm.js'),
  },
  css: [
    'primevue/resources/themes/lara-light-indigo/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '~/assets/styles/site-shell.css',
    '~/../src/assets/tailwind.css',
    '~/../src/assets/style.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  runtimeConfig: {
    public: {
      siteUrl: publicSiteUrl,
      defaultOgImage: SITE_DEFAULTS.defaultOgImage,
      defaultOgImageAlt: SITE_DEFAULTS.defaultOgImageAlt,
      defaultRobots: SITE_DEFAULTS.defaultRobots,
      isInspo2026Enabled: IS_2026_INSPO_ENABLED,
      googleAnalyticsId,
      firebaseApiKey:
        process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.VUE_APP_FIREBASE_API_KEY || '',
      firebaseAuthDomain:
        process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
        process.env.VUE_APP_FIREBASE_AUTH_DOMAIN ||
        '',
      firebaseProjectId:
        process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VUE_APP_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket:
        process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
        process.env.VUE_APP_FIREBASE_STORAGE_BUCKET ||
        '',
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
        process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID ||
        '',
      firebaseAppId:
        process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.VUE_APP_FIREBASE_APP_ID || '',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Isaure Lohest - Portfolio Web & Branding',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'google-site-verification', content: 'EMvF50TV6FJ15aX-rATo37PVNbAt2px5huuSiKzBfsk' },
        { name: 'p:domain_verify', content: '5c09ae80d11788fcf8e222e3735c2b3d' },
        { name: 'author', content: 'Isaure Lohest' },
        { name: 'theme-color', content: '#f3ede8' },
        { name: 'robots', content: SITE_DEFAULTS.defaultRobots },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:site_name', content: 'Isaure Lohest Portfolio' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap',
        },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Xanh+Mono:ital@0;1&display=swap' },
        { rel: 'icon', href: '/assets/media/common/images/isaure-logo-B-960.avif', type: 'image/avif' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
          async: true,
        },
        {
          key: 'gtag-init',
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleAnalyticsId}');`,
        },
        {
          key: 'ld-person',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Isaure Lohest',
            url: publicSiteUrl,
            jobTitle: 'Web Designer & Developer',
            sameAs: ['https://www.instagram.com/isaurelohest/'],
            knowsAbout: ['Web design', 'Web development', 'Branding'],
          }),
        },
        {
          key: 'ld-website',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Isaure Lohest Portfolio',
            url: publicSiteUrl,
            inLanguage: 'en',
          }),
        },
      ],
    },
  },
  vite: {
    ssr: {
      noExternal: ['primevue'],
    },
    define: {
      'process.env.BASE_URL': JSON.stringify('/'),
      'process.env.VUE_APP_FIREBASE_API_KEY': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_API_KEY || process.env.VUE_APP_FIREBASE_API_KEY || '',
      ),
      'process.env.VUE_APP_FIREBASE_AUTH_DOMAIN': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || '',
      ),
      'process.env.VUE_APP_FIREBASE_PROJECT_ID': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VUE_APP_FIREBASE_PROJECT_ID || '',
      ),
      'process.env.VUE_APP_FIREBASE_STORAGE_BUCKET': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
          process.env.VUE_APP_FIREBASE_STORAGE_BUCKET ||
          '',
      ),
      'process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
          process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID ||
          '',
      ),
      'process.env.VUE_APP_FIREBASE_APP_ID': JSON.stringify(
        process.env.NUXT_PUBLIC_FIREBASE_APP_ID || process.env.VUE_APP_FIREBASE_APP_ID || '',
      ),
    },
  },
  nitro: {
    prerender: {
      routes: [...PRERENDER_ROUTES, '/sitemap.xml'],
    },
    routeRules: {
      '/achievements/web-developement/boda-natalia-y-mauricio': {
        redirect: '/achievements/web-developement',
      },
    },
  },
});
