<template>
  <div>
    <Hero />
    <HeroSeparator />
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue';
import HeroSeparator from '@/components/home/HeroSeparator.vue';

export default {
  name: 'HomeHeroSection',
  components: { Hero, HeroSeparator },
};
</script>
