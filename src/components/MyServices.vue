<template>
  <section class="services-page">
    <ServicesHero />
    <ServicesGrid />
    <CreativeCollaborations />
    <FinalCTA />
    <EditorialTimeline />
    <ReachOutCTA />
  </section>
</template>

<script>
import ServicesHero from '@/components/services/ServicesHero.vue';
import ServicesGrid from '@/components/services/ServicesGrid.vue';
import EditorialTimeline from '@/components/services/EditorialTimeline.vue';
import CreativeCollaborations from '@/components/services/CreativeCollaborations.vue';
import FinalCTA from '@/components/services/FinalCTA.vue';
import ReachOutCTA from '@/components/services/ReachOutCTA.vue';

export default {
  name: 'MesServices',
  components: {
    ServicesHero,
    ServicesGrid,
    EditorialTimeline,
    CreativeCollaborations,
    FinalCTA,
    ReachOutCTA,
  },
};
</script>

<style scoped>
.services-page {
  color: var(--text-primary);
}
</style>
