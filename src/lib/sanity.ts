import { createClient } from '@sanity/client';
import type { WorkProject } from './projects';
import { parseProjectSlug } from '../i18n/routes';

export const SANITY_PROJECT_ID = import.meta.env.SANITY_PROJECT_ID || 'lplxpp6m';
export const SANITY_DATASET = import.meta.env.SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: !import.meta.env.DEV, // en développement : données fraîches, sans cache CDN
});

// Un projet = un document par langue (fr / en), reliés par le même slug. Voir studio/schemaTypes/project.ts.
const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current) && defined(language) && coalesce(published, true)]{
  _id,
  language,
  title,
  "slug": slug.current,
  year,
  orderRank,
  "sector": coalesce(sector->titleEn, sector),
  "sectorFr": sector->title,
  "date": coalesce(date, year + "-01-01"),
  "cover": cover.asset->url,
  "summary": business,
  "videoUrl": coalesce(video.asset->url, videoUrl)
}`;

interface SanityProject {
  _id: string;
  language: 'fr' | 'en';
  title: string;
  slug: string;
  year?: string;
  orderRank?: string;
  sector?: string;
  sectorFr?: string;
  date?: string;
  cover?: string;
  summary?: string;
  videoUrl?: string;
}

/** Projets dont le contenu ne doit pas encore être montré si Sanity est injoignable au build (garde-fou). */
const COMING_SOON_FALLBACK = new Set(['studio-abime']);

/** « Bientôt disponible » : la page du projet n'affiche pas son contenu. Réglé dans Sanity (champ « comingSoon »). */
export const isComingSoon = async (slug: string): Promise<boolean> => {
  try {
    const v = await sanityClient.fetch<boolean | null>(`count(*[_type == "project" && slug.current == $slug && comingSoon == true]) > 0`, { slug });
    return Boolean(v);
  } catch {
    return COMING_SOON_FALLBACK.has(slug);
  }
};

export const fetchSanityProjects = async (): Promise<WorkProject[]> => {
  const rows = await sanityClient.fetch<SanityProject[]>(PROJECTS_QUERY);
  const bySlug = new Map<string, Partial<Record<'fr' | 'en', SanityProject>>>();
  for (const r of rows) {
    bySlug.set(r.slug, { ...bySlug.get(r.slug), [r.language]: r });
  }
  const items = [...bySlug.values()].flatMap(({ fr, en }) => {
    // données communes (couverture, date…) : version française, sinon anglaise ; textes : chacun sa langue, avec repli
    const r = fr?.cover ? fr : en;
    if (!r?.cover) return [];
    const { kind, slug } = parseProjectSlug(r.slug);
    const date = r.date ? new Date(r.date) : new Date(`${r.year ?? '2000'}-01-01`);
    return [
      {
        rank: fr?.orderRank ?? en?.orderRank,
        date: date.getTime(),
        project: {
          id: `${kind}-${slug}`, // pas l’_id Sanity : il garde l’ancien nom des projets renommés
          slug,
          title: en?.title || r.title,
          titleFr: fr?.title && fr.title !== (en?.title || r.title) ? fr.title : undefined,
          year: r.year ?? String(date.getFullYear()),
          sector: en?.sector || fr?.sector || '',
          sectorFr: fr?.sectorFr || fr?.sector || undefined,
          kind,
          cover: `${r.cover}?w=720&auto=format&fit=max`,
          href: `/work/${kind === 'web' ? 'web-development' : 'branding'}/${slug}`,
          summary: { fr: fr?.summary ?? '', en: en?.summary ?? '' },
          order: 0,
          video: r.videoUrl || undefined,
        } satisfies WorkProject,
      },
    ];
  });
  // ordre du Studio (glisser-déposer, premier = plus en avant) ; sans rang : après les autres, du plus récent au plus ancien
  items.sort((a, b) => (a.rank && b.rank ? (a.rank < b.rank ? -1 : a.rank > b.rank ? 1 : 0) : a.rank ? -1 : b.rank ? 1 : b.date - a.date));
  return items.map(({ project }, i) => ({ ...project, order: items.length - i }));
};
