import { fr } from './fr';
import { en } from './en';
import type { Dict } from './fr';
import { flatSlug, resolveFlatSlug } from './routes';
import type { ProjectKind } from './routes';

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];
export const DEFAULT_LANG: Lang = 'fr';

const dicts: Record<Lang, Dict> = { fr, en };

export const getDict = (lang: Lang): Dict => dicts[lang];

/** Déduit la langue depuis le chemin : `/en/...` → en, sinon fr (racine). */
export const getLangFromPath = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';

/**
 * Adresses françaises : le chemin « canonique » (celui des fichiers et des données, `/work`, `/process`)
 * s'affiche en français en `/projets` et `/methode`. L'anglais garde `/en/work`, `/en/process`.
 */
const FR_SLUGS: Record<string, string> = { work: 'projets', process: 'methode' };
const FR_TO_CANON: Record<string, string> = Object.fromEntries(
  Object.entries(FR_SLUGS).map(([canon, fr]) => [fr, canon]),
);

/** Retire le préfixe de langue et ramène au chemin canonique : `/en/work` → `/work`, `/projets/x` → `/work/x`. */
export const stripLang = (pathname: string): string => {
  const p = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  const out = p.replace(/^\/([^/]+)/, (m, seg: string) => (FR_TO_CANON[seg] ? `/${FR_TO_CANON[seg]}` : m));
  const trimmed = out.length > 1 ? out.replace(/\/+$/, '') : out;
  // adresse plate d'un projet (/projets/<projet>) → chemin canonique /work/<type>/<slug>
  const flat = trimmed.match(/^\/work\/([^/]+)$/);
  if (flat && flat[1] !== 'web-development' && flat[1] !== 'branding') {
    const r = resolveFlatSlug(flat[1]);
    if (r) return `/work/${r.kind}/${r.slug}`;
  }
  return trimmed;
};

/** Chemin localisé : localePath('/work', 'en') → `/en/work` ; localePath('/work', 'fr') → `/projets`. */
export const localePath = (path: string, lang: Lang): string => {
  const clean = path === '/' ? '' : path.replace(/\/+$/, '');
  // projets : plus de sous-dossier web-development / branding dans l'adresse
  const proj = clean.match(/^\/work\/(web-development|branding)(?:\/([^/]+))?$/);
  if (proj) {
    const base = lang === 'en' ? '/en/work' : '/projets';
    return proj[2] ? `${base}/${flatSlug(proj[1] as ProjectKind, proj[2])}` : base;
  }
  if (lang === 'en') return `/en${clean}` || '/en';
  const fr = clean.replace(/^\/([^/]+)/, (m, seg: string) => (FR_SLUGS[seg] ? `/${FR_SLUGS[seg]}` : m));
  return fr || '/';
};

/** Même page dans l'autre langue. */
export const alternatePath = (pathname: string, lang: Lang): string =>
  localePath(stripLang(pathname), lang === 'fr' ? 'en' : 'fr');
