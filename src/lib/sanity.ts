import { createClient } from '@sanity/client';
import type { WorkProject } from './projects';

export const SANITY_PROJECT_ID = import.meta.env.SANITY_PROJECT_ID || 'lplxpp6m';
export const SANITY_DATASET = import.meta.env.SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: true,
});

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current) && coalesce(published, true)]{
  _id,
  title,
  "slug": slug.current,
  kind,
  year,
  rank,
  sector,
  sectorFr,
  "date": coalesce(date, year + "-01-01"),
  "cover": cover.asset->url,
  summaryFr,
  summaryEn,
  externalUrl,
  keywords,
  keywordsFr,
  "videoUrl": coalesce(video.asset->url, videoUrl),
  "gallery": gallery[coalesce(showInGrid, true)]{
    "src": image.asset->url,
    "w": image.asset->metadata.dimensions.width,
    "h": image.asset->metadata.dimensions.height,
    caption
  }
}`;

interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  kind?: 'web' | 'branding';
  year?: string;
  rank?: number;
  sector?: string;
  sectorFr?: string;
  date?: string;
  cover?: string;
  summaryFr?: string;
  summaryEn?: string;
  externalUrl?: string;
  keywords?: string[];
  keywordsFr?: string[];
  videoUrl?: string;
  gallery?: { src?: string; w?: number; h?: number; caption?: string }[];
}

/** Projets dont le contenu ne doit pas encore être montré si Sanity est injoignable au build (garde-fou). */
const COMING_SOON_FALLBACK = new Set(['studio-abime']);

/** « Bientôt disponible » : la page du projet n'affiche pas son contenu. Réglé dans Sanity (champ « comingSoon »). */
export const isComingSoon = async (slug: string): Promise<boolean> => {
  try {
    const v = await sanityClient.fetch<boolean | null>(`*[_type == "project" && slug.current == $slug][0].comingSoon`, { slug });
    return Boolean(v);
  } catch {
    return COMING_SOON_FALLBACK.has(slug);
  }
};

export const fetchSanityProjects = async (): Promise<WorkProject[]> => {
  const rows = await sanityClient.fetch<SanityProject[]>(PROJECTS_QUERY);
  return rows
    .filter((r) => r.cover)
    .map((r) => {
      const kind = r.kind ?? 'web';
      const date = r.date ? new Date(r.date) : new Date(`${r.year ?? '2000'}-01-01`);
      return {
        id: r._id,
        slug: r.slug,
        title: r.title,
        year: r.year ?? String(date.getFullYear()),
        sector: r.sector ?? '',
        sectorFr: r.sectorFr || undefined,
        kind,
        cover: `${r.cover}?w=720&auto=format&fit=max`,
        href: r.externalUrl || `/work/${kind === 'web' ? 'web-development' : 'branding'}/${r.slug}`,
        summary: { fr: r.summaryFr ?? '', en: r.summaryEn ?? '' },
        order: date.getTime() + (r.rank ?? 0),
        keywords: r.keywords ?? [],
        keywordsFr: r.keywordsFr?.length ? r.keywordsFr : undefined,
        video: r.videoUrl || undefined,
        images: (r.gallery ?? [])
          .filter((g) => g.src && g.w && g.h)
          .map((g) => ({ src: `${g.src}?w=1400&auto=format`, w: g.w!, h: g.h!, caption: g.caption })),
      };
    });
};
