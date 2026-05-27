<template>
  <div class="project-detail-page">
    <component :is="pageComponent" />
    <section class="project-detail-cta container mx-auto px-4" aria-label="Start a project">
      <NuxtLink to="/contact" class="portfolio-pill-link">Start a project</NuxtLink>
    </section>
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

.project-detail-cta {
  display: flex;
  justify-content: center;
  padding-bottom: clamp(4rem, 8vw, 7rem);
}

.project-detail-cta .portfolio-pill-link {
  background: var(--text-primary);
  border-color: var(--text-primary);
  color: var(--text-inverse);
}

.project-detail-cta .portfolio-pill-link:hover,
.project-detail-cta .portfolio-pill-link:focus-visible {
  background: var(--surface-accent);
  border-color: var(--surface-accent);
  color: var(--text-inverse);
}

@media (max-width: 970px) {
  .project-detail-page {
    padding-top: calc(62px + 0.8rem);
  }
}
</style>
