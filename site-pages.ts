export type SitePageMeta = {
  path: string;
  title: string;
  description: string;
  robots?: string;
};

export const IS_2026_INSPO_ENABLED = process.env.NUXT_EXCLUDE_2026_INSPO !== '1';

const webProjectDescription = (title: string) =>
  `${title} is a web development case study by Isaure Lohest, covering UX/UI decisions, implementation details, and final delivery.`;

const brandingProjectDescription = (title: string) =>
  `${title} is a branding case study by Isaure Lohest, covering visual direction, identity design, and brand applications.`;

const createWebProject = (
  slug: string,
  title: string,
  description?: string,
): SitePageMeta => ({
  path: `/achievements/web-developement/${slug}`,
  title: `${title} — Dev Project — Isaure Lohest`,
  description: description ?? webProjectDescription(title),
});

const createBrandingProject = (
  slug: string,
  title: string,
  description?: string,
): SitePageMeta => ({
  path: `/achievements/branding/${slug}`,
  title: `${title} — Branding — Isaure Lohest`,
  description: description ?? brandingProjectDescription(title),
});

export const standalonePages = {
  home: {
    path: '/',
    title: 'Home — Isaure Lohest',
    description: 'Portfolio of Isaure Lohest: web design, web development, and branding.',
  },
  services: {
    path: '/services',
    title: 'Services — Isaure Lohest',
    description:
      'Explore Isaure Lohest services in web design, web development, SEO optimization, and digital strategy.',
  },
  contact: {
    path: '/contact',
    title: 'Contact — Isaure Lohest',
    description:
      'Get in touch with Isaure Lohest for your website project, brand refresh, or digital collaboration.',
  },
  inspo2026: {
    path: '/2026-inspo',
    title: '2026 Inspo — Isaure Lohest',
    description:
      'An editorial inspiration page by Isaure Lohest exploring 2026 design ideas through collages, imagery, and tactile visual notes.',
  },
  achievements: {
    path: '/achievements',
    title: 'Work — Isaure Lohest',
    description: 'Selected web and branding projects designed and built by Isaure Lohest.',
  },
  achievementsWeb: {
    path: '/achievements/web-developement',
    title: 'Web Development — Isaure Lohest',
    description:
      'Web development case studies focused on UX/UI, frontend implementation, and business outcomes.',
  },
  achievementsBranding: {
    path: '/achievements/branding',
    title: 'Branding — Isaure Lohest',
    description:
      'Branding case studies: visual identities, design systems, and art direction for digital-first brands.',
  },
} satisfies Record<string, SitePageMeta>;

export const webDevelopmentPages = {
  'the-perfect-hamburger': createWebProject(
    'the-perfect-hamburger',
    'The Perfect Hamburger',
  ),
  didacmania: createWebProject(
    'didacmania',
    'Didacmania',
  ),
  creyda: createWebProject(
    'creyda',
    'Creyda Yoga',
  ),
  gradient: createWebProject(
    'gradient',
    'Gradient',
  ),
  'john-scissors': createWebProject(
    'john-scissors',
    'John Scissors',
  ),
  'la-petite-serre-urbaine': createWebProject(
    'la-petite-serre-urbaine',
    'La Petite Serre Urbaine',
  ),
  'academie-cle-do-re': createWebProject(
    'academie-cle-do-re',
    'Académie Clé Do Ré',
  ),
  'tranche-de-cake': createWebProject(
    'tranche-de-cake',
    'Tranche de CaKe',
  ),
  'boda-marta-y-pedro': createWebProject(
    'boda-marta-y-pedro',
    'Marta & Pedro wedding',
  ),
  'louis-cattiaux': createWebProject(
    'louis-cattiaux',
    'Louis Cattiaux',
  ),
  bellelachaise: createWebProject(
    'bellelachaise',
    'Bellelachaise',
  ),
  'boda-carmen-nestor': createWebProject(
    'boda-carmen-nestor',
    'Carmen & Néstor wedding',
  ),
  'boda-lis-pavlos': createWebProject(
    'boda-lis-pavlos',
    'Lis & Pavlos wedding',
  ),
  'canpruna-accomodation': createWebProject(
    'canpruna-accomodation',
    'Can Pruna',
  ),
  'mark-conlan': createWebProject(
    'mark-conlan',
    'Mark Conlan',
  ),
  'private-event-operations-dashboard-wedding-edition': createWebProject(
    'private-event-operations-dashboard-wedding-edition',
    'Private event operations dashboard (Wedding Edition)',
    'A private wedding invitation SPA paired with a full operations back office (RSVP, seating plan exports, timeline, budget, email tooling, RBAC, and AI assistant) plus a super-admin area for onboarding and permissions.',
  ),
  averys: createWebProject(
    'averys',
    'Averys',
    'Averys is an editorial web design and front-end development case study shaped through art direction, logo design, immersive motion, and refined UX/UI composition.',
  ),
} satisfies Record<string, SitePageMeta>;

export const brandingPages = {
  'trio-linaris': createBrandingProject(
    'trio-linaris',
    'Trio Linaris',
    'Trio Linaris is a branding and editorial design case study centered on art direction, typographic rhythm, and a refined presentation dossier for a classical music ensemble.',
  ),
  bellelachaise: createBrandingProject(
    'bellelachaise',
    'Bellelachaise',
  ),
  'elinor-kinesiologie': createBrandingProject(
    'elinor-kinesiologie',
    'Elinor Kinesiology',
  ),
  'canpruna-accomodation': createBrandingProject(
    'canpruna-accomodation',
    'Can Pruna',
  ),
  flou: createBrandingProject(
    'flou',
    'Flou',
  ),
  baud: createBrandingProject(
    'baud',
    'Baud Architectes',
  ),
} satisfies Record<string, SitePageMeta>;

export const PRERENDER_ROUTES = [
  standalonePages.home.path,
  standalonePages.services.path,
  standalonePages.contact.path,
  ...(IS_2026_INSPO_ENABLED ? [standalonePages.inspo2026.path] : []),
  standalonePages.achievements.path,
  standalonePages.achievementsWeb.path,
  standalonePages.achievementsBranding.path,
  ...Object.values(webDevelopmentPages).map((page) => page.path),
  ...Object.values(brandingPages).map((page) => page.path),
];

export const SITE_DEFAULTS = {
  siteUrl: 'https://isaure-lohest.com',
  defaultOgImage: 'https://isaure-lohest.com/assets/media/common/images/isaure-logo-B-960.avif',
  defaultOgImageAlt: 'Isaure Lohest portfolio preview',
  defaultRobots: 'index, follow, max-image-preview:large',
};
