import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteLocationNormalizedLoaded,
  type RouteRecordRaw,
} from 'vue-router';

const HomeIsaure = () => import(/* webpackChunkName: "home" */ '../components/HomeIsaure.vue');
const MyServices = () => import(/* webpackChunkName: "services" */ '../components/MyServices.vue');
const ContactIsaure = () =>
  import(/* webpackChunkName: "contact" */ '../components/ContactIsaure.vue');

const Achievements = () =>
  import(/* webpackChunkName: "achievements" */ '../components/Achievements.vue');
const WebDevelopement = () =>
  import(/* webpackChunkName: "webdev" */ '../components/WebDevelopement.vue');
const BrandingGallery = () =>
  import(/* webpackChunkName: "branding" */ '../components/branding.vue');

const HamburgerProject = () =>
  import(/* webpackChunkName: "proj-hamburger" */ '../components/web-dev/HamburgerProject.vue');
const DidacmaniaProject = () =>
  import(/* webpackChunkName: "proj-didacmania" */ '../components/web-dev/DidacmaniaProject.vue');
const CreydaProject = () =>
  import(/* webpackChunkName: "proj-creyda" */ '../components/web-dev/CreydaProject.vue');
const GradientProject = () =>
  import(/* webpackChunkName: "proj-gradient" */ '../components/web-dev/GradientProject.vue');
const JohnScissorsProject = () =>
  import(
    /* webpackChunkName: "proj-johnscissors" */ '../components/web-dev/JohnScissorsProject.vue'
  );
const LaPetiteSerreUrbaineProject = () =>
  import(
    /* webpackChunkName: "proj-lpsu" */ '../components/web-dev/LaPetiteSerreUrbaineProject.vue'
  );
const AcademieCleDoReProject = () =>
  import(/* webpackChunkName: "proj-cledore" */ '../components/web-dev/AcademieCleDoReProject.vue');
const TrancheDeCakeProject = () =>
  import(/* webpackChunkName: "proj-tdc" */ '../components/web-dev/TrancheDeCakeProject.vue');
const BodaMartaPedroProject = () =>
  import(/* webpackChunkName: "proj-boda-mp" */ '../components/web-dev/BodaMartaPedroProject.vue');
const BodaNataliaMauricioProject = () =>
  import(
    /* webpackChunkName: "proj-boda-nm" */ '../components/web-dev/BodaNataliaMauricioProject.vue'
  );
const LouisCattiauxProject = () =>
  import(/* webpackChunkName: "proj-lc" */ '../components/web-dev/LouisCattiauxProject.vue');
const BellelachaiseProject = () =>
  import(
    /* webpackChunkName: "proj-bellelachaise" */ '../components/web-dev/BellelachaiseProject.vue'
  );
const CanprunaProject = () =>
  import(/* webpackChunkName: "proj-canpruna" */ '../components/web-dev/CanprunaProject.vue');
const BodaCarmenNestorProject = () =>
  import(
    /* webpackChunkName: "proj-boda-cn" */ '../components/web-dev/BodaCarmenNestorProject.vue'
  );
const BodaLisPavlosProject = () =>
  import(/* webpackChunkName: "proj-boda-lp" */ '../components/web-dev/BodaLisPavlosProject.vue');
const MarkConlanProject = () =>
  import(/* webpackChunkName: "proj-mark-conlan" */ '../components/web-dev/MarkConlanProject.vue');
const EventDashboardProject = () =>
  import(
    /* webpackChunkName: "proj-event-dashboard" */ '../components/web-dev/EventDashboardProject.vue'
  );

const BellelachaiseBranding = () =>
  import(
    /* webpackChunkName: "brand-bellelachaise" */ '../components/branding/BellelachaiseBranding.vue'
  );
const ElinorBranding = () =>
  import(/* webpackChunkName: "brand-elinor" */ '../components/branding/ElinorBranding.vue');
const CanprunaBranding = () =>
  import(/* webpackChunkName: "brand-canpruna" */ '../components/branding/CanprunaBranding.vue');
const FlouBranding = () =>
  import(/* webpackChunkName: "brand-flou" */ '../components/branding/FlouBranding.vue');

const NotFound = () => import(/* webpackChunkName: "not-found" */ '../components/NotFound.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-isaure',
    component: HomeIsaure,
    meta: {
      title: 'Home — Isaure Lohest',
      breadcrumb: 'Home',
      description: 'Portfolio of Isaure Lohest: web design, web development, and branding.',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: MyServices,
    meta: {
      title: 'Services — Isaure Lohest',
      breadcrumb: 'Services',
      description:
        'Explore Isaure Lohest services in web design, web development, SEO optimization, and digital strategy.',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactIsaure,
    meta: {
      title: 'Contact — Isaure Lohest',
      breadcrumb: 'Contact',
      description:
        'Get in touch with Isaure Lohest for your website project, brand refresh, or digital collaboration.',
    },
  },
  {
    path: '/achievements',
    name: 'achievements-root',
    component: RouterView,
    meta: { title: 'Work — Isaure Lohest', breadcrumb: 'Achievements' },
    children: [
      {
        path: '',
        name: 'achievements',
        component: Achievements,
        meta: { title: 'Work — Isaure Lohest', breadcrumb: null },
      },
      {
        path: 'web-developement',
        name: 'achievements-web',
        component: RouterView,
        meta: { title: 'Web Development — Isaure Lohest', breadcrumb: 'Web developement' },
        children: [
          {
            path: '',
            name: 'web-developement',
            component: WebDevelopement,
            meta: { title: 'Web Development — Isaure Lohest', breadcrumb: null },
          },
          {
            path: 'the-perfect-hamburger',
            name: 'hamburger-project',
            component: HamburgerProject,
            meta: {
              title: 'The Perfect Hamburger — Dev Project — Isaure Lohest',
              breadcrumb: 'The Perfect Hamburger',
            },
          },
          {
            path: 'didacmania',
            name: 'didacmania-project',
            component: DidacmaniaProject,
            meta: { title: 'Didacmania — Dev Project — Isaure Lohest', breadcrumb: 'Didacmania' },
          },
          {
            path: 'creyda',
            name: 'creyda-project',
            component: CreydaProject,
            meta: { title: 'Creyda Yoga — Dev Project — Isaure Lohest', breadcrumb: 'Creyda Yoga' },
          },
          {
            path: 'gradient',
            name: 'gradient-project',
            component: GradientProject,
            meta: { title: 'Gradient — Dev Project — Isaure Lohest', breadcrumb: 'Gradient' },
          },
          {
            path: 'john-scissors',
            name: 'john-scissors-project',
            component: JohnScissorsProject,
            meta: {
              title: 'John Scissors — Dev Project — Isaure Lohest',
              breadcrumb: 'John Scissors',
            },
          },
          {
            path: 'la-petite-serre-urbaine',
            name: 'la-petite-serre-urbaine-project',
            component: LaPetiteSerreUrbaineProject,
            meta: {
              title: 'La Petite Serre Urbaine — Dev Project — Isaure Lohest',
              breadcrumb: 'La Petite Serre Urbaine',
            },
          },
          {
            path: 'academie-cle-do-re',
            name: 'academie-cle-do-re-project',
            component: AcademieCleDoReProject,
            meta: {
              title: 'Académie Clé Do Ré — Dev Project — Isaure Lohest',
              breadcrumb: 'Académie Clé Do Ré',
            },
          },
          {
            path: 'tranche-de-cake',
            name: 'tranche-de-cake-project',
            component: TrancheDeCakeProject,
            meta: {
              title: 'Tranche de CaKe — Dev Project — Isaure Lohest',
              breadcrumb: 'Tranche de CaKe',
            },
          },
          {
            path: 'boda-marta-y-pedro',
            name: 'boda-marta-y-pedro-project',
            component: BodaMartaPedroProject,
            meta: {
              title: 'Marta & Pedro wedding — Dev Project — Isaure Lohest',
              breadcrumb: 'Marta & Pedro wedding',
            },
          },
          {
            path: 'boda-natalia-y-mauricio',
            name: 'boda-natalia-y-mauricio-project',
            component: BodaNataliaMauricioProject,
            meta: {
              title: 'Natalia & Mauricio wedding — Dev Project — Isaure Lohest',
              breadcrumb: 'Natalia & Mauricio wedding',
            },
          },
          {
            path: 'louis-cattiaux',
            name: 'louis-cattiaux-project',
            component: LouisCattiauxProject,
            meta: {
              title: 'Louis Cattiaux — Dev Project — Isaure Lohest',
              breadcrumb: 'Louis Cattiaux',
            },
          },
          {
            path: 'bellelachaise',
            name: 'bellelachaise-project',
            component: BellelachaiseProject,
            meta: {
              title: 'Bellelachaise — Dev Project — Isaure Lohest',
              breadcrumb: 'Bellelachaise',
            },
          },
          {
            path: 'boda-carmen-nestor',
            name: 'boda-carmen-nestor-project',
            component: BodaCarmenNestorProject,
            meta: {
              title: 'Carmen & Néstor wedding — Dev Project — Isaure Lohest',
              breadcrumb: 'Carmen & Néstor wedding',
            },
          },
          {
            path: 'boda-lis-pavlos',
            name: 'boda-lis-pavlos-project',
            component: BodaLisPavlosProject,
            meta: {
              title: 'Lis & Pavlos wedding — Dev Project — Isaure Lohest',
              breadcrumb: 'Lis & Pavlos wedding',
            },
          },
          {
            path: 'canpruna-accomodation',
            name: 'canpruna-accomodation-project',
            component: CanprunaProject,
            meta: { title: 'Can Pruna — Dev Project — Isaure Lohest', breadcrumb: 'Can Pruna' },
          },
          {
            path: 'mark-conlan',
            name: 'mark-conlan-project',
            component: MarkConlanProject,
            meta: { title: 'Mark Conlan — Dev Project — Isaure Lohest', breadcrumb: 'Mark Conlan' },
          },
          {
            path: 'private-event-operations-dashboard-wedding-edition',
            name: 'private-event-operations-dashboard-wedding-edition-project',
            component: EventDashboardProject,
            meta: {
              title: 'Private event operations dashboard (Wedding Edition) — Dev Project — Isaure Lohest',
              breadcrumb: 'Private event ops dashboard',
              description:
                'A private wedding invitation SPA paired with a full operations back office (RSVP, seating plan exports, timeline, budget, email tooling, RBAC, and AI assistant) plus a super-admin area for onboarding and permissions.',
            },
          },
        ],
      },
      {
        path: 'branding',
        name: 'achievements-branding',
        component: RouterView,
        meta: { title: 'Branding — Isaure Lohest', breadcrumb: 'Branding' },
        children: [
          {
            path: '',
            name: 'branding',
            component: BrandingGallery,
            meta: { title: 'Branding — Isaure Lohest', breadcrumb: null },
          },
          {
            path: 'bellelachaise',
            name: 'bellelachaise-branding',
            component: BellelachaiseBranding,
            meta: {
              title: 'Bellelachaise — Branding — Isaure Lohest',
              breadcrumb: 'Bellelachaise',
            },
          },
          {
            path: 'elinor-kinesiologie',
            name: 'elinor-branding',
            component: ElinorBranding,
            meta: {
              title: 'Elinor Kinesiology — Branding — Isaure Lohest',
              breadcrumb: 'Elinor Kinesiology ',
            },
          },
          {
            path: 'canpruna-accomodation',
            name: 'canpruna-accomodation-branding',
            component: CanprunaBranding,
            meta: { title: 'Can Pruna — Branding — Isaure Lohest', breadcrumb: 'Can Pruna ' },
          },
          {
            path: 'flou',
            name: 'flou-branding',
            component: FlouBranding,
            meta: { title: 'Flou — Branding — Isaure Lohest', breadcrumb: 'Flou' },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Not found — Isaure Lohest',
      breadcrumb: 'Not found',
      description: 'The requested page could not be found.',
      robots: 'noindex, nofollow',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 0 };
    return { left: 0, top: 0 };
  },
});

const DEFAULT_TITLE = 'Isaure Lohest — Portfolio';
const suffix = 'Isaure Lohest — Portfolio';
const SITE_URL = 'https://isaure-lohest.com';
const DEFAULT_DESCRIPTION = 'Portfolio of Isaure Lohest: web design, web development, and branding.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/media/pages/home/sticker-isaure-v2-noQR-960.png`;
const DEFAULT_OG_IMAGE_ALT = 'Isaure Lohest portfolio preview';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large';

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  'home-isaure': 'Portfolio of Isaure Lohest: web design, web development, and branding.',
  services:
    'Web design, web development, SEO optimization, and digital support by Isaure Lohest.',
  contact:
    'Contact Isaure Lohest to launch, redesign, or improve your digital presence.',
  achievements:
    'Selected web and branding projects designed and built by Isaure Lohest.',
  'web-developement':
    'Web development case studies focused on UX/UI, frontend implementation, and business outcomes.',
  branding:
    'Branding case studies: visual identities, design systems, and art direction for digital-first brands.',
};

const getDocumentTitle = (to: RouteLocationNormalizedLoaded): string => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((record) => Boolean(record.meta.title))
    ?.meta.title;

  if (!nearestWithTitle) {
    return DEFAULT_TITLE;
  }

  return nearestWithTitle.includes('—') ? nearestWithTitle : `${nearestWithTitle} — ${suffix}`;
};

const setMetaContent = (selector: string, content: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
};

const setLinkHref = (selector: string, href: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('href', href);
  }
};

const getNearestMetaString = (to: RouteLocationNormalizedLoaded, key: string): string | null => {
  const value = to.matched
    .slice()
    .reverse()
    .map((record) => record.meta?.[key])
    .find((metaValue) => typeof metaValue === 'string');

  return typeof value === 'string' ? value : null;
};

const getProjectDescription = (title: string, kind: 'web' | 'branding'): string => {
  if (kind === 'web') {
    return `${title} is a web development case study by Isaure Lohest, covering UX/UI decisions, implementation details, and final delivery.`;
  }

  return `${title} is a branding case study by Isaure Lohest, covering visual direction, identity design, and brand applications.`;
};

const getRouteDescription = (to: RouteLocationNormalizedLoaded): string => {
  const metaDescription = getNearestMetaString(to, 'description');
  if (metaDescription) return metaDescription;

  const nearestTitle = getNearestMetaString(to, 'title');
  if (nearestTitle && to.path.startsWith('/achievements/web-developement/')) {
    const projectTitle = nearestTitle.split(' — ')[0];
    return getProjectDescription(projectTitle, 'web');
  }
  if (nearestTitle && to.path.startsWith('/achievements/branding/')) {
    const projectTitle = nearestTitle.split(' — ')[0];
    return getProjectDescription(projectTitle, 'branding');
  }

  const routeName = typeof to.name === 'string' ? to.name : '';
  return ROUTE_DESCRIPTIONS[routeName] ?? DEFAULT_DESCRIPTION;
};

router.afterEach((to) => {
  const title = getDocumentTitle(to);
  const description = getRouteDescription(to);
  const canonical = `${SITE_URL}${to.path}`;
  const robots = getNearestMetaString(to, 'robots') ?? DEFAULT_ROBOTS;

  document.title = title;
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="robots"]', robots);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonical);
  setMetaContent('meta[property="og:image"]', DEFAULT_OG_IMAGE);
  setMetaContent('meta[property="og:image:alt"]', DEFAULT_OG_IMAGE_ALT);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', DEFAULT_OG_IMAGE);
  setMetaContent('meta[name="twitter:url"]', canonical);
  setLinkHref('link[rel="canonical"]', canonical);
});

export default router;
