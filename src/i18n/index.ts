import { fr } from './fr';
import { en } from './en';
import type { Dict } from './fr';

export type Lang = 'fr' | 'en';
export const LANGS: Lang[] = ['fr', 'en'];
export const DEFAULT_LANG: Lang = 'fr';

// Les textes édités dans Sanity passent par-dessus ceux du code (voir src/lib/sanity-copy.ts). Côté navigateur : textes du code.
let dicts: Record<Lang, Dict> = { fr, en };
if (import.meta.env.SSR) {
  const { loadCopyOverlay, applyOverlay } = await import('../lib/sanity-copy');
  const overlay = await loadCopyOverlay();
  dicts = { fr: applyOverlay(fr, overlay.fr), en: applyOverlay(en, overlay.en) };
}

export const getDict = (lang: Lang): Dict => dicts[lang];

/** Déduit la langue depuis le chemin : `/en/...` → en, sinon fr (racine). */
export const getLangFromPath = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';

/** Retire le préfixe de langue : `/en/work` → `/work`. */
export const stripLang = (pathname: string): string => {
  const p = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
};

/** Chemin localisé : localePath('/work', 'en') → `/en/work`. */
export const localePath = (path: string, lang: Lang): string => {
  const clean = path === '/' ? '' : path.replace(/\/+$/, '');
  return lang === 'en' ? `/en${clean}` || '/en' : clean || '/';
};

/** Même page dans l'autre langue. */
export const alternatePath = (pathname: string, lang: Lang): string =>
  localePath(stripLang(pathname), lang === 'fr' ? 'en' : 'fr');
