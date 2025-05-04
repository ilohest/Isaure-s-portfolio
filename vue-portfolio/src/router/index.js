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
import NotFound from '../components/NotFound.vue';

const routes = [
  { path: '/', name: 'home-isaure', component: HomeIsaure },
  { path: '/services', name: 'services', component: MyServices },
  { path: '/contact', name: 'contact', component: ContactIsaure },
  {
    path: '/achievements',
    component: RouterView,
    children: [
      {
        path: 'web-developement',
        component: RouterView,
        children: [
          { path: '', name: 'web-developement', component: WebDevelopement },
          { path: 'the-perfect-hamburger', name: 'hamburger-project', component: HamburgerProject },
          { path: 'didacmania', name: 'didacmania-project', component: DidacmaniaProject },
          { path: 'creyda', name: 'creyda-project', component: CreydaProject },
          { path: 'gradient', name: 'gradient-project', component: GradientProject },
          { path: 'john-scissors', name: 'john-scissors-project', component: JohnScissorsProject },
          { path: 'la-petite-serre-urbaine', name: 'la-petite-serre-urbaine-project', component: LaPetiteSerreUrbaineProject },
          { path: 'academie-cle-do-re', name: 'academie-cle-do-re-project', component: AcademieCleDoReProject },
          { path: 'tranche-de-cake', name: 'tranche-de-cake-project', component: TrancheDeCakeProject },
          { path: 'boda-marta-y-pedro', name: 'boda-marta-y-pedro-project', component: BodaMartaPedroProject },
          { path: 'boda-natalia-y-mauricio', name: 'boda-natalia-y-mauricio-project', component: BodaNataliaMauricioProject },
          { path: 'louis-cattiaux', name: 'louis-cattiaux-project', component: LouisCattiauxProject },
          { path: 'bellelachaise', name: 'bellelachaise-project', component: BellelachaiseProject }
        ]
      },
      {
        path: 'branding',
        component: RouterView,
        children: [
          { path: '', name: 'branding', component: BrandingGallery },
          { path: 'bellelachaise', name: 'bellelachaise-branding', component: BellelachaiseBranding },
          { path: 'elinor-kinesiologie', name: 'elinor-branding', component: ElinorBranding }
        ]
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; }
});

export default router;
