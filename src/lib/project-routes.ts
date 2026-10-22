import allProjects from '@/all-projects';
import { brandingPages, webDevelopmentPages } from '../../site-pages';
import { flatSlug } from '../i18n/routes';

// Projets déjà portés (à synchroniser avec componentBySlug des gabarits WebProjectPage / BrandingProjectPage).
const WEB_PORTED = new Set([
  'vinciane-vinckenbosch',
  'averys',
  'professional-platform',
  'goa-kombucha-flow',
  'studio-abime',
  'goa-b2b',
  'boda-carmen-nestor',
  'boda-marta-y-pedro',
  'louis-cattiaux',
  'the-perfect-hamburger',
  'la-petite-serre-urbaine',
  'academie-cle-do-re',
  'creyda',
  'bellelachaise',
  'boda-lis-pavlos',
  'canpruna-accomodation',
  'didacmania',
  'tranche-de-cake',
  'mark-conlan',
  'alyssa-coleman-back-of-house',
  'private-event-operations-dashboard-wedding-edition',
]);
const BRANDING_PORTED = new Set([
  'flou',
  'bellelachaise',
  'baud',
  'elinor-kinesiologie',
  'canpruna-accomodation',
  'trio-linaris',
]);

/** Toutes les pages projet (web + branding) sous une seule adresse plate : /projets/<projet>. */
export function getProjectStaticPaths() {
  const sorted = [...allProjects].sort((a, b) => a.order - b.order);
  const build = (
    kind: 'web-development' | 'branding',
    pages: Record<string, { path: string; title: string }>,
    ported: Set<string>,
    titleSuffix: RegExp,
  ) =>
    Object.entries(pages)
      .filter(([slug]) => ported.has(slug))
      .map(([slug, page]) => {
        const idx = sorted.findIndex((p) => p.projectLink === page.path);
        const prev = idx > 0 ? sorted[idx - 1] : null;
        const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null;
        return {
          params: { slug: flatSlug(kind, slug) },
          props: {
            kind,
            slug,
            page,
            title: page.title.replace(titleSuffix, ''),
            prevHref: prev?.projectLink ?? null,
            nextHref: next?.projectLink ?? null,
          },
        };
      });
  return [
    ...build('web-development', webDevelopmentPages, WEB_PORTED, / — Web Development — Isaure Lohest$/),
    ...build('branding', brandingPages, BRANDING_PORTED, / — Branding — Isaure Lohest$/),
  ];
}
