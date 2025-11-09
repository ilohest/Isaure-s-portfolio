import { createRouter, createWebHistory, RouterView } from 'vue-router';
import HomeIsaure from '../components/HomeIsaure.vue';
import MyServices from '../components/MyServices.vue';
import ContactIsaure from '../components/ContactIsaure.vue';
import WebDevelopement from '../components/WebDevelopement.vue';
import BrandingGallery from '../components/branding.vue';
import HamburgerProject from '../components/web-dev/HamburgerProject.vue';
import DidacmaniaProject from '../components/web-dev/DidacmaniaProject.vue';
import CreydaProject from '../components/web-dev/CreydaProject.vue';
import GradientProject from '../components/web-dev/GradientProject.vue';
import JohnScissorsProject from '../components/web-dev/JohnScissorsProject.vue';
import LaPetiteSerreUrbaineProject from '../components/web-dev/LaPetiteSerreUrbaineProject.vue';
import AcademieCleDoReProject from '../components/web-dev/AcademieCleDoReProject.vue';
import TrancheDeCakeProject from '../components/web-dev/TrancheDeCakeProject.vue';
import BodaMartaPedroProject from '../components/web-dev/BodaMartaPedroProject.vue';
import BodaNataliaMauricioProject from '../components/web-dev/BodaNataliaMauricioProject.vue';
import LouisCattiauxProject from '../components/web-dev/LouisCattiauxProject.vue';
import BellelachaiseProject from '../components/web-dev/BellelachaiseProject.vue';
import BellelachaiseBranding from '../components/branding/BellelachaiseBranding.vue';
import ElinorBranding from '../components/branding/ElinorBranding.vue';
import CanprunaBranding from '../components/branding/CanprunaBranding.vue';
import CanprunaProject from '../components/web-dev/CanprunaProject.vue';
import BodaCarmenNestorProject from '../components/web-dev/BodaCarmenNestorProject.vue';
import BodaLisPavlosProject from '../components/web-dev/BodaLisPavlosProject.vue';
import FlouBranding from '../components/branding/FlouBranding.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home-isaure',
    component: HomeIsaure,
    meta: { title: 'Home — Isaure Lohest', breadcrumb: 'Home' },
  },
  {
    path: '/services',
    name: 'services',
    component: MyServices,
    meta: { title: 'Services — Isaure Lohest', breadcrumb: 'Services' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactIsaure,
    meta: { title: 'Contact — Isaure Lohest', breadcrumb: 'Contact' },
  },
  {
    path: '/achievements',
    component: RouterView,
    meta: { title: 'Work — Isaure Lohest', breadcrumb: 'Achievements' },
    children: [
      {
        path: 'web-developement',
        component: RouterView,
        meta: { title: 'Web developement — Isaure Lohest', breadcrumb: 'Web developement' },
        children: [
          {
            path: '',
            name: 'web-developement',
            component: WebDevelopement,
            meta: { title: 'Web developement — Isaure Lohest', breadcrumb: null },
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
        ],
      },
      {
        path: 'branding',
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
    meta: { title: 'Not found — Isaure Lohest', breadcrumb: 'Not found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// Dynamic tab title
const DEFAULT_TITLE = 'Isaure Lohest — Portfolio';
const suffix = 'Isaure Lohest — Portfolio';

router.afterEach((to) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)?.meta.title;

  if (nearestWithTitle) {
    document.title = nearestWithTitle.includes('—')
      ? nearestWithTitle
      : `${nearestWithTitle} — ${suffix}`;
  } else {
    document.title = DEFAULT_TITLE;
  }
});

export default router;
