import webDevProjects from '../web-dev-projects';
import brandingProjects from '../branding-projects';
import type { Lang } from '../i18n';
import { fetchSanityProjects } from './sanity';
import { FALLBACK_SUMMARY } from './summaries';
import { galleryFor, fileExists } from './local-media';
import type { WorkImage } from './local-media';

export type { WorkImage };

export interface WorkProject {
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
  keywords: string[];
  sectorFr?: string;
  keywordsFr?: string[];
  images: WorkImage[];
  video?: string;
}

/** Projets gardés en ligne (URL actives) mais retirés de la liste Work et des « autres projets ». */
export const HIDDEN_SLUGS = new Set(['boda-lis-pavlos', 'academie-cle-do-re', 'la-petite-serre-urbaine', 'the-perfect-hamburger']);

const slugOf = (link: string) => link.split('/').filter(Boolean).pop() ?? link;

const local = async (): Promise<WorkProject[]> => {
  const web = webDevProjects.map((p) => ({ p, kind: 'web' as const }));
  const brand = brandingProjects.map((p) => ({ p, kind: 'branding' as const }));
  return Promise.all(
    [...web, ...brand].map(async ({ p, kind }) => {
      const slug = slugOf(p.projectLink);
      const video = 'src' in p && p.src && (await fileExists(p.src)) ? p.src : undefined;
      const images = await galleryFor(p.placeholder);
      const sector = p.sector ?? '';
      return {
        id: `${kind}-${slug}`,
        slug,
        title: p.title,
        year: p.year,
        sector,
        kind,
        cover: p.placeholder,
        href: p.projectLink,
        summary: FALLBACK_SUMMARY[slug] ?? { fr: '', en: '' },
        order: p.order,
        // valeurs de départ : à remplacer par vos propres mots-clés dans Sanity
        keywords: [kind === 'web' ? 'Web design' : 'Branding', ...sector.split(/\s*[\/&]\s*/).filter(Boolean)],
        images,
        video,
      };
    }),
  );
};

/** Projets triés du plus récent au plus ancien. Sanity en priorité, sinon données locales. */
export const getProjects = async (): Promise<WorkProject[]> => {
  let list: WorkProject[] = [];
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
  if (!list.length) list = await local();
  return [...list].filter((p) => !HIDDEN_SLUGS.has(p.slug)).sort((a, b) => b.order - a.order);
};

export const summaryFor = (p: WorkProject, lang: Lang) => p.summary[lang] || p.summary.fr || '';
