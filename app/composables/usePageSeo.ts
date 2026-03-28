import type { SitePageMeta } from '../../site-pages';
import { SITE_DEFAULTS } from '../../site-pages';

export function usePageSeo(page: Pick<SitePageMeta, 'title' | 'description' | 'robots'>) {
  const route = useRoute();
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl || SITE_DEFAULTS.siteUrl;
  const canonicalUrl = `${siteUrl}${route.path}`;
  const robots = page.robots || config.public.defaultRobots || SITE_DEFAULTS.defaultRobots;
  const ogImage = config.public.defaultOgImage || SITE_DEFAULTS.defaultOgImage;
  const ogImageAlt = config.public.defaultOgImageAlt || SITE_DEFAULTS.defaultOgImageAlt;

  useSeoMeta({
    title: page.title,
    description: page.description,
    author: 'Isaure Lohest',
    robots,
    themeColor: '#f3ede8',
    ogTitle: page.title,
    ogDescription: page.description,
    ogUrl: canonicalUrl,
    ogType: 'website',
    ogImage,
    ogImageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: page.title,
    twitterDescription: page.description,
    twitterImage: ogImage,
  });

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
  });
}
