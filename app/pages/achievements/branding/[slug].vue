<template>
  <div class="project-detail-page">
    <component :is="pageComponent" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { brandingPages } from '../../../../site-pages';
import { useProjectStructuredData } from '../../../composables/useProjectStructuredData';

const pageComponentBySlug = {
  'trio-linaris': defineAsyncComponent(() => import('@/components/branding/TioLinarisBranding.vue')),
  bellelachaise: defineAsyncComponent(
    () => import('@/components/branding/BellelachaiseBranding.vue'),
  ),
  'elinor-kinesiologie': defineAsyncComponent(
    () => import('@/components/branding/ElinorBranding.vue'),
  ),
  'canpruna-accomodation': defineAsyncComponent(
    () => import('@/components/branding/CanprunaBranding.vue'),
  ),
  flou: defineAsyncComponent(() => import('@/components/branding/FlouBranding.vue')),
  baud: defineAsyncComponent(() => import('@/components/branding/BaudBranding.vue')),
} as const;

const route = useRoute();
const slugParam = route.params.slug;
const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

if (!slug) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

const page = brandingPages[slug];
const pageComponent = pageComponentBySlug[slug as keyof typeof pageComponentBySlug];

if (!page || !pageComponent) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' });
}

usePageSeo(page);
useProjectStructuredData({
  title: page.title.replace(/ — Branding — Isaure Lohest$/, ''),
  description: page.description,
  path: page.path,
  sectionLabel: 'Branding',
  sectionPath: '/achievements/branding',
  projectType: 'Branding project',
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
