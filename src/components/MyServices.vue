<template>
  <section class="services-page">
    <ServicesHero :hero-avif-srcset="heroAvifSrcset" />
    <ServicesGrid :grid-card-avif-srcsets="gridCardAvifSrcsets" />
    <CreativeCollaborations :collab-avif-srcset="collabAvifSrcset" />
    <FinalCTA />
    <EditorialTimeline />
    <ServicesFAQ />
    <ReachOutCTA :image-avif-srcset="reachOutAvifSrcset" />
  </section>
</template>

<script>
import ServicesHero from '@/components/services/ServicesHero.vue';
import ServicesGrid from '@/components/services/ServicesGrid.vue';
import EditorialTimeline from '@/components/services/EditorialTimeline.vue';
import CreativeCollaborations from '@/components/services/CreativeCollaborations.vue';
import FinalCTA from '@/components/services/FinalCTA.vue';
import ServicesFAQ from '@/components/services/ServicesFAQ.vue';
import ReachOutCTA from '@/components/services/ReachOutCTA.vue';

export default {
  name: 'MesServices',
  components: {
    ServicesHero,
    ServicesGrid,
    EditorialTimeline,
    CreativeCollaborations,
    FinalCTA,
    ServicesFAQ,
    ReachOutCTA,
  },
  props: {
    heroAvifSrcset: {
      type: String,
      default: '',
    },
    collabAvifSrcset: {
      type: String,
      default: '',
    },
    reachOutAvifSrcset: {
      type: String,
      default: '',
    },
    gridCardAvifSrcsets: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.services-page {
  color: var(--text-primary);
  cursor:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' shape-rendering='crispEdges'%3E%3Cpath fill='%23ff78b6' d='M8 4h4v4H8zM12 4h4v4h-4zM20 4h4v4h-4zM24 4h4v4h-4zM4 8h4v4H4zM8 8h4v4H8zM12 8h4v4h-4zM16 8h4v4h-4zM20 8h4v4h-4zM24 8h4v4h-4zM28 8h4v4h-4zM4 12h4v4H4zM8 12h4v4H8zM12 12h4v4h-4zM16 12h4v4h-4zM20 12h4v4h-4zM24 12h4v4h-4zM28 12h4v4h-4zM8 16h4v4H8zM12 16h4v4h-4zM16 16h4v4h-4zM20 16h4v4h-4zM24 16h4v4h-4zM12 20h4v4h-4zM16 20h4v4h-4zM20 20h4v4h-4zM16 24h4v4h-4z'/%3E%3Cpath fill='%23ffc0dc' d='M8 8h4v4H8zM12 12h4v4h-4z'/%3E%3Cpath fill='%23d93683' d='M24 12h4v4h-4zM20 20h4v4h-4zM16 24h4v4h-4z'/%3E%3C/svg%3E")
      16 16,
    auto;
}

.services-page :deep(*) {
  cursor: inherit !important;
}

.services-page :deep(a[href]),
.services-page :deep(button:not(:disabled)),
.services-page :deep(input[type='button']:not(:disabled)),
.services-page :deep(input[type='submit']:not(:disabled)),
.services-page :deep(input[type='reset']:not(:disabled)),
.services-page :deep(select:not(:disabled)),
.services-page :deep(summary),
.services-page :deep(label[for]),
.services-page :deep([role='button']),
.services-page :deep([role='link']),
.services-page :deep([tabindex]:not([tabindex='-1'])),
.services-page :deep(.cursor-pointer) {
  cursor: var(--cursor-pixel-hand) !important;
}
</style>
