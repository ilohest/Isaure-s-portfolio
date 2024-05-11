import { createRouter, createWebHistory  } from 'vue-router';
import HomeIsaure from '../components/HomeIsaure.vue';
import MyServices from '../components/MyServices.vue';
import ContactIsaure from '../components/ContactIsaure.vue';
import HamburgerProject from '../components/HamburgerProject.vue';
import DidacmaniaProject from '../components/DidacmaniaProject.vue';

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
    name: 'didacmania-prooject',
    component: DidacmaniaProject
  },
  {
    path: '/',
    name: 'home-isaure',
    component: HomeIsaure
  },
  {
    path: '/',
    name: 'home-isaure',
    component: HomeIsaure
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router