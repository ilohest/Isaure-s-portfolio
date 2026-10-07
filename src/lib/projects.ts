import webDevProjects from '../web-dev-projects';
import brandingProjects from '../branding-projects';
import type { Lang } from '../i18n';
import { fetchSanityProjects } from './sanity';
import { FALLBACK_SUMMARY } from './summaries';

export interface PuzzleProject {
  id: string;
  slug: string;
  title: string;
  year: string;
  sector: string;
  kind: 'web' | 'branding';
  cover: string;
  href: string;
  summary: { fr: string; en: string };
  order: number;
}

const slugOf = (link: string) => link.split('/').filter(Boolean).pop() ?? link;

const local = (): PuzzleProject[] => {
  const web = webDevProjects.map((p) => ({ p, kind: 'web' as const }));
  const brand = brandingProjects.map((p) => ({ p, kind: 'branding' as const }));
  return [...web, ...brand].map(({ p, kind }) => {
    const slug = slugOf(p.projectLink);
    return {
      id: `${kind}-${slug}`,
      slug,
      title: p.title,
      year: p.year,
      sector: p.sector ?? '',
      kind,
      cover: p.placeholder,
      href: p.projectLink,
      summary: FALLBACK_SUMMARY[slug] ?? { fr: '', en: '' },
      order: p.order,
    };
  });
};

/** Projets triés du plus récent au plus ancien. Sanity en priorité, sinon données locales. */
export const getProjects = async (): Promise<PuzzleProject[]> => {
  let list: PuzzleProject[] = [];
  try {
    list = (await fetchSanityProjects()).map((p) => ({
      ...p,
      summary: {
        fr: p.summary.fr || FALLBACK_SUMMARY[p.slug]?.fr || '',
        en: p.summary.en || FALLBACK_SUMMARY[p.slug]?.en || '',
      },
    }));
  } catch (err) {
    console.warn('[projects] Sanity indisponible, repli sur les données locales:', err);
  }
  if (!list.length) list = local();
  return [...list].sort((a, b) => b.order - a.order);
};

export const summaryFor = (p: PuzzleProject, lang: Lang) => p.summary[lang] || p.summary.fr || '';
