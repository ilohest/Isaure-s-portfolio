import { brandingPages, webDevelopmentPages } from '../../site-pages';

/**
 * Adresses plates des projets : /projets/<projet> (et /en/work/<projet>), sans sous-dossier web / branding.
 * En interne, un projet garde son chemin canonique /work/<web-development|branding>/<slug>.
 * Quand un même slug existe en web et en branding, la version branding prend le suffixe « -branding ».
 */
export type ProjectKind = 'web-development' | 'branding';

const last = (p: string) => p.split('/').filter(Boolean).pop() ?? '';
const WEB = new Set(Object.values(webDevelopmentPages).map((p) => last(p.path)));
const BRANDING = new Set(Object.values(brandingPages).map((p) => last(p.path)));

export const flatSlug = (kind: ProjectKind, slug: string) =>
  kind === 'branding' && WEB.has(slug) ? `${slug}-branding` : slug;

export const resolveFlatSlug = (flat: string): { kind: ProjectKind; slug: string } | null => {
  if (flat.endsWith('-branding')) {
    const base = flat.slice(0, -'-branding'.length);
    if (BRANDING.has(base) && WEB.has(base)) return { kind: 'branding', slug: base };
  }
  if (WEB.has(flat)) return { kind: 'web-development', slug: flat };
  if (BRANDING.has(flat)) return { kind: 'branding', slug: flat };
  return null;
};
