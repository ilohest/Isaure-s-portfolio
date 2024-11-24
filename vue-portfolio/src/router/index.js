import { createRouter, createWebHistory  } from 'vue-router';
import HomeIsaure from '../components/HomeIsaure.vue';
import MyServices from '../components/MyServices.vue';
import ContactIsaure from '../components/ContactIsaure.vue';
import HamburgerProject from '../components/HamburgerProject.vue';
import DidacmaniaProject from '../components/DidacmaniaProject.vue';
import CreydaProject from '../components/CreydaProject.vue';
import GradientProject from '../components/GradientProject.vue';
import JohnScissorsProject from '../components/JohnScissorsProject.vue';
import LaPetiteSerreUrbaineProject from '../components/LaPetiteSerreUrbaineProject.vue';
import AcademieCleDoReProject from '../components/AcademieCleDoReProject.vue';
import TrancheDeCakeProject from '../components/TrancheDeCakeProject.vue';
import BodaMartaPedroProject from '../components/BodaMartaPedroProject.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home-isaure',
    component: HomeIsaure
  },
  {
    path: '/services',
    name: 'services',
    component: MyServices
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactIsaure
  },
  {
    path: '/achievements/the-perfect-hamburger-project',
    name: 'hamburger-project',
    component: HamburgerProject
  },
  {
    path: '/achievements/didacmania-project',
    name: 'didacmania-project',
    component: DidacmaniaProject
  },
  {
    path: '/achievements/creyda-project',
    name: 'creyda-project',
    component: CreydaProject,
  },
  {
    path: '/achievements/gradient-project',
    name: 'gradient-project',
    component: GradientProject
  },
  {
    path: '/achievements/john-scissors-project',
    name: 'john-scissors-project',
    component: JohnScissorsProject
  },
  {
    path: '/achievements/la-petite-serre-urbaine-project',
    name: 'la-petite-serre-urbaine-project',
    component: LaPetiteSerreUrbaineProject
  },
  {
    path: '/achievements/academie-cle-do-re-project',
    name: 'academie-cle-do-re-project',
    component: AcademieCleDoReProject
  },
  {
    path: '/achievements/tranche-de-cake-project',
    name: 'tranche-de-cake-project',
    component: TrancheDeCakeProject
  },
  {
    path: '/achievements/boda-marta-y-pedro-project',
    name: 'boda-marta-y-pedro-project',
    component: BodaMartaPedroProject
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router