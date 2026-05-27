<template>
  <HomeIsaure :is-dark="isDark" :palette-variant="homePaletteVariant" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { standalonePages } from '../../site-pages';

const HomeIsaure = defineAsyncComponent(() => import('@/components/HomeIsaure.vue'));
const { isDark } = useSiteTheme();
const homePaletteVariant = ref<'default' | 'sun'>('default');

const applyRandomHomePalette = () => {
  const requestedPalette = new URLSearchParams(window.location.search).get('palette');
  const isSunPalette =
    requestedPalette === 'sun' || (requestedPalette !== 'default' && Math.random() < 0.25);
  homePaletteVariant.value = isSunPalette ? 'sun' : 'default';
  document.documentElement.classList.toggle('home-palette-sun', isSunPalette);
};

onBeforeMount(() => {
  applyRandomHomePalette();
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove('home-palette-sun');
});

usePageSeo(standalonePages.home);
</script>
