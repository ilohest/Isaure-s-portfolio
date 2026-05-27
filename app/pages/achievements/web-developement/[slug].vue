<template>
  <div class="project-detail-page">
    <Transition name="back-fade">
      <NuxtLink v-if="showBackBtn" to="/achievements" class="back-project-float">
        Back to projects
      </NuxtLink>
    </Transition>
    <component :is="pageComponent" />
    <section class="project-detail-cta container mx-auto px-4" aria-label="Work with me">
      <NuxtLink to="/contact" class="portfolio-pill-link">Work with me</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { webDevelopmentPages } from '../../../../site-pages';
import { useProjectStructuredData } from '../../../composables/useProjectStructuredData';

const scrollBackVisible = ref(false);
const mouseNearTop = ref(false);
const showBackBtn = computed(() => scrollBackVisible.value || mouseNearTop.value);
let lastScrollY = 0;
let scrollEl: HTMLElement | null = null;

const onScroll = () => {
  if (!scrollEl) return;
  const y = scrollEl.scrollTop;
  const delta = y - lastScrollY;
  if (y > 80) {
    if (delta < -6) scrollBackVisible.value = true;
    else if (delta > 6) scrollBackVisible.value = false;
  } else {
    scrollBackVisible.value = false;
  }
  lastScrollY = y;
};

const onPointerMove = (event: PointerEvent) => {
  mouseNearTop.value = event.clientY <= 120;
};

onMounted(() => {
  scrollEl = document.querySelector<HTMLElement>('main[data-scroll-container]');
  if (scrollEl) scrollEl.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
});

onBeforeUnmount(() => {
  if (scrollEl) scrollEl.removeEventListener('scroll', onScroll);
  window.removeEventListener('pointermove', onPointerMove);
  scrollEl = null;
});

const pageComponentBySlug = {
  'goa-kombucha-flow': defineAsyncComponent(
    () => import('@/components/web-dev/GoaKombuchaFlowProject.vue'),
  ),
  'client-lawyer-platform': defineAsyncComponent(
    () => import('@/components/web-dev/ClientLawyerPlatformProject.vue'),
  ),
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

/* Hide the inline back button that lives inside each project component */
:deep(section > div:first-child:has(.btn-link)) {
  display: none !important;
}

.back-project-float {
  position: fixed;
  top: calc(48px + 1.1rem);
  left: clamp(0.75rem, 2.5vw, 2rem);
  z-index: 400;
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  gap: 0.7rem;
  padding: 0.78rem 1.25rem;
  background: var(--surface-base);
  border: 1px solid var(--text-primary);
  border-radius: 999px;
  color: var(--text-primary);
  font-family: var(--font-family-display);
  font-size: clamp(1rem, 1.08vw, 1.24rem);
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.24s ease;
}

.back-project-float::before {
  content: '←';
  display: inline-block;
  font-size: 1em;
  line-height: 1;
}

.back-project-float:hover,
.back-project-float:focus-visible {
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: var(--text-inverse);
  transform: translateY(-2px);
  outline: none;
}

:deep(section > .mb-8.flex.flex-col.items-center.justify-between.gap-4 .p-button) {
  background: transparent !important;
  border-color: var(--text-primary) !important;
  color: var(--text-primary) !important;
}

:deep(section > .mb-8.flex.flex-col.items-center.justify-between.gap-4 .p-button:hover),
:deep(section > .mb-8.flex.flex-col.items-center.justify-between.gap-4 .p-button:focus-visible) {
  background: var(--interactive-primary) !important;
  border-color: var(--interactive-primary) !important;
  color: var(--text-inverse) !important;
}

.back-fade-enter-active,
.back-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.back-fade-enter-from,
.back-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
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
  background: var(--interactive-primary);
  border-color: var(--interactive-primary);
  color: var(--text-inverse);
}

@media (max-width: 970px) {
  .project-detail-page {
    padding-top: calc(62px + 0.8rem);
  }

  .back-project-float {
    top: calc(62px + 0.9rem);
  }
}
</style>
