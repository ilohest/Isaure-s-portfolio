import { createClient } from '@sanity/client';
import type { PuzzleProject } from './projects';

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
  externalUrl
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
}

export const fetchSanityProjects = async (): Promise<PuzzleProject[]> => {
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
      };
    });
};
