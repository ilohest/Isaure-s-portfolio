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
  "date": coalesce(date, year + "-01-01"),
  "cover": cover.asset->url,
  summaryFr,
  summaryEn,
  externalUrl,
  keywords,
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
  date?: string;
  cover?: string;
  summaryFr?: string;
  summaryEn?: string;
  externalUrl?: string;
  keywords?: string[];
  videoUrl?: string;
  gallery?: { src?: string; w?: number; h?: number; caption?: string }[];
}

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
        kind,
        cover: `${r.cover}?w=720&auto=format&fit=max`,
        href: r.externalUrl || `/work/${kind === 'web' ? 'web-development' : 'branding'}/${r.slug}`,
        summary: { fr: r.summaryFr ?? '', en: r.summaryEn ?? '' },
        order: date.getTime() + (r.rank ?? 0),
        keywords: r.keywords ?? [],
        video: r.videoUrl || undefined,
        images: (r.gallery ?? [])
          .filter((g) => g.src && g.w && g.h)
          .map((g) => ({ src: `${g.src}?w=1400&auto=format`, w: g.w!, h: g.h!, caption: g.caption })),
      };
    });
};
