<template>
  <div class="project-detail-page">
    <component :is="pageComponent" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { webDevelopmentPages } from '../../../../site-pages';
import { useProjectStructuredData } from '../../../composables/useProjectStructuredData';

const pageComponentBySlug = {
  'alyssa-coleman-back-of-house': defineAsyncComponent(
    () => import('@/components/web-dev/AlyssaColemanBackOfHouseProject.vue'),
  ),
  'the-perfect-hamburger': defineAsyncComponent(
    () => import('@/components/web-dev/HamburgerProject.vue'),
  ),
  didacmania: defineAsyncComponent(() => import('@/components/web-dev/DidacmaniaProject.vue')),
  creyda: defineAsyncComponent(() => import('@/components/web-dev/CreydaProject.vue')),
  gradient: defineAsyncComponent(() => import('@/components/web-dev/GradientProject.vue')),
  'john-scissors': defineAsyncComponent(
    () => import('@/components/web-dev/JohnScissorsProject.vue'),
  ),
  'la-petite-serre-urbaine': defineAsyncComponent(
    () => import('@/components/web-dev/LaPetiteSerreUrbaineProject.vue'),
  ),
  'academie-cle-do-re': defineAsyncComponent(
    () => import('@/components/web-dev/AcademieCleDoReProject.vue'),
  ),
  'tranche-de-cake': defineAsyncComponent(
    () => import('@/components/web-dev/TrancheDeCakeProject.vue'),
  ),
  'boda-marta-y-pedro': defineAsyncComponent(
    () => import('@/components/web-dev/BodaMartaPedroProject.vue'),
  ),
  'louis-cattiaux': defineAsyncComponent(
    () => import('@/components/web-dev/LouisCattiauxProject.vue'),
  ),
  bellelachaise: defineAsyncComponent(
    () => import('@/components/web-dev/BellelachaiseProject.vue'),
  ),
  'boda-carmen-nestor': defineAsyncComponent(
    () => import('@/components/web-dev/BodaCarmenNestorProject.vue'),
  ),
  'boda-lis-pavlos': defineAsyncComponent(
    () => import('@/components/web-dev/BodaLisPavlosProject.vue'),
  ),
  'canpruna-accomodation': defineAsyncComponent(
    () => import('@/components/web-dev/CanprunaProject.vue'),
  ),
  'mark-conlan': defineAsyncComponent(() => import('@/components/web-dev/MarkConlanProject.vue')),
  'private-event-operations-dashboard-wedding-edition': defineAsyncComponent(
    () => import('@/components/web-dev/EventDashboardProject.vue'),
  ),
  averys: defineAsyncComponent(() => import('@/components/web-dev/AverysProject.vue')),
} as const;

const route = useRoute();
const slugParam = route.params.slug;
const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

if (!slug) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

if (slug === 'boda-natalia-y-mauricio') {
  await navigateTo('/achievements/web-developement', {
    redirectCode: 301,
  });
}

const page = webDevelopmentPages[slug];
const pageComponent = pageComponentBySlug[slug as keyof typeof pageComponentBySlug];

if (!page || !pageComponent) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

usePageSeo(page);
useProjectStructuredData({
  title: page.title.replace(/ — Web Development — Isaure Lohest$/, ''),
  description: page.description,
  path: page.path,
  sectionLabel: 'Web Development',
  sectionPath: '/achievements/web-developement',
  projectType: 'Web development project',
});
</script>

<style scoped>
.project-detail-page {
  padding-top: calc(48px + 0.9rem);
}

@media (max-width: 970px) {
  .project-detail-page {
    padding-top: calc(62px + 0.8rem);
  }
}
</style>
