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
}
</style>
