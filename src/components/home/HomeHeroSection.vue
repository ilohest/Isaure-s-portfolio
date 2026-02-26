<template>
  <div>
    <Hero />
    <div class="h-[6rem] w-full"></div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue';

export default {
  name: 'HomeHeroSection',
  components: { Hero },
};
</script>
