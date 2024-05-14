import { createRouter, createWebHistory  } from 'vue-router';
import HomeIsaure from '../components/HomeIsaure.vue';
import MyServices from '../components/MyServices.vue';
import ContactIsaure from '../components/ContactIsaure.vue';
import HamburgerProject from '../components/HamburgerProject.vue';
import DidacmaniaProject from '../components/DidacmaniaProject.vue';
import CreydaProject from '../components/CreydaProject.vue';
import GradientProject from '../components/GradientProject.vue';
import JohnScissorsProject from '../components/JohnScissorsProject.vue';
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