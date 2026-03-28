import {
  brandingPages,
  IS_2026_INSPO_ENABLED,
  SITE_DEFAULTS,
  standalonePages,
  webDevelopmentPages,
} from '../../site-pages';

type SitemapEntry = {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
};

const sitemapEntries: SitemapEntry[] = [
  { path: standalonePages.home.path, changefreq: 'weekly', priority: '1.0' },
  { path: standalonePages.services.path, changefreq: 'monthly', priority: '0.9' },
  { path: standalonePages.contact.path, changefreq: 'monthly', priority: '0.7' },
  ...(IS_2026_INSPO_ENABLED
    ? [{ path: standalonePages.inspo2026.path, changefreq: 'monthly' as const, priority: '0.8' }]
    : []),
  { path: standalonePages.achievements.path, changefreq: 'weekly', priority: '0.9' },
  { path: standalonePages.achievementsWeb.path, changefreq: 'weekly', priority: '0.8' },
  { path: standalonePages.achievementsBranding.path, changefreq: 'weekly', priority: '0.8' },
  ...Object.values(webDevelopmentPages).map((page) => ({
    path: page.path,
    changefreq: 'monthly' as const,
    priority: '0.8',
  })),
  ...Object.values(brandingPages).map((page) => ({
    path: page.path,
    changefreq: 'monthly' as const,
    priority: '0.8',
  })),
];

export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl || SITE_DEFAULTS.siteUrl;
  const lastmod = new Date().toISOString().slice(0, 10);
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map(
      (entry) => `  <url>
    <loc>${normalizedSiteUrl}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    ),
    '</urlset>',
  ].join('\n');

  setHeader(event, 'content-type', 'application/xml; charset=utf-8');

  return body;
});
