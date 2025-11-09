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
    meta: { title: 'Home — Isaure Lohest' },
  },
  {
    path: '/services',
    name: 'services',
    component: MyServices,
    meta: { title: 'Services — Isaure Lohest' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactIsaure,
    meta: { title: 'Contact — Isaure Lohest' },
  },
  {
    path: '/achievements',
    component: RouterView,
    meta: { title: 'Work — Isaure Lohest' },
    children: [
      {
        path: 'web-developement',
        component: RouterView,
        meta: { title: 'Web developement — Isaure Lohest' },
        children: [
          {
            path: '',
            name: 'web-developement',
            component: WebDevelopement,
            meta: { title: 'Web developement — Isaure Lohest' },
          },
          {
            path: 'the-perfect-hamburger',
            name: 'hamburger-project',
            component: HamburgerProject,
            meta: { title: 'The Perfect Hamburger — Dev Project — Isaure Lohest' },
          },
          {
            path: 'didacmania',
            name: 'didacmania-project',
            component: DidacmaniaProject,
            meta: { title: 'Didacmania — Dev Project — Isaure Lohest' },
          },
          {
            path: 'creyda',
            name: 'creyda-project',
            component: CreydaProject,
            meta: { title: 'CREYDA Yoga — Dev Project — Isaure Lohest' },
          },
          {
            path: 'gradient',
            name: 'gradient-project',
            component: GradientProject,
            meta: { title: 'Gradient — Dev Project — Isaure Lohest' },
          },
          {
            path: 'john-scissors',
            name: 'john-scissors-project',
            component: JohnScissorsProject,
            meta: { title: 'John Scissors — Dev Project — Isaure Lohest' },
          },
          {
            path: 'la-petite-serre-urbaine',
            name: 'la-petite-serre-urbaine-project',
            component: LaPetiteSerreUrbaineProject,
            meta: { title: 'La Petite Serre Urbaine — Dev Project — Isaure Lohest' },
          },
          {
            path: 'academie-cle-do-re',
            name: 'academie-cle-do-re-project',
            component: AcademieCleDoReProject,
            meta: { title: 'Académie Clé Do Ré — Dev Project — Isaure Lohest' },
          },
          {
            path: 'tranche-de-cake',
            name: 'tranche-de-cake-project',
            component: TrancheDeCakeProject,
            meta: { title: 'Tranche de Cake — Dev Project — Isaure Lohest' },
          },
          {
            path: 'boda-marta-y-pedro',
            name: 'boda-marta-y-pedro-project',
            component: BodaMartaPedroProject,
            meta: { title: 'Boda Marta y Pedro — Dev Project — Isaure Lohest' },
          },
          {
            path: 'boda-natalia-y-mauricio',
            name: 'boda-natalia-y-mauricio-project',
            component: BodaNataliaMauricioProject,
            meta: { title: 'Boda Natalia y Mauricio — Dev Project — Isaure Lohest' },
          },
          {
            path: 'louis-cattiaux',
            name: 'louis-cattiaux-project',
            component: LouisCattiauxProject,
            meta: { title: 'Louis Cattiaux — Dev Project — Isaure Lohest' },
          },
          {
            path: 'bellelachaise',
            name: 'bellelachaise-project',
            component: BellelachaiseProject,
            meta: { title: 'Bellelachaise — Dev Project — Isaure Lohest' },
          },
          {
            path: 'boda-carmen-nestor',
            name: 'boda-carmen-nestor-project',
            component: BodaCarmenNestorProject,
            meta: { title: 'Boda Carmen y Néstor — Dev Project — Isaure Lohest' },
          },
          {
            path: 'boda-lis-pavlos',
            name: 'boda-lis-pavlos-project',
            component: BodaLisPavlosProject,
            meta: { title: 'Boda Lis y Pavlos — Dev Project — Isaure Lohest' },
          },
          {
            path: 'canpruna-accomodation',
            name: 'canpruna-accomodation-project',
            component: CanprunaProject,
            meta: { title: 'Can Pruna — Dev Project — Isaure Lohest' },
          },
        ],
      },
      {
        path: 'branding',
        component: RouterView,
        meta: { title: 'Branding — Isaure Lohest' },
        children: [
          {
            path: '',
            name: 'branding',
            component: BrandingGallery,
            meta: { title: 'Branding — Isaure Lohest' },
          },
          {
            path: 'bellelachaise',
            name: 'bellelachaise-branding',
            component: BellelachaiseBranding,
            meta: { title: 'Bellelachaise — Branding — Isaure Lohest' },
          },
          {
            path: 'elinor-kinesiologie',
            name: 'elinor-branding',
            component: ElinorBranding,
            meta: { title: 'Elinor Kinesiology — Branding — Isaure Lohest' },
          },
          {
            path: 'canpruna-accomodation',
            name: 'canpruna-accomodation-branding',
            component: CanprunaBranding,
            meta: { title: 'Can Pruna — Branding — Isaure Lohest' },
          },
          {
            path: 'flou',
            name: 'flou-branding',
            component: FlouBranding,
            meta: { title: 'FLOU — Branding — Isaure Lohest' },
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { title: 'Not found — Isaure Lohest' },
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
