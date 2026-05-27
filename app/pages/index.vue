<template>
  <HomeIsaure :is-dark="isDark" :palette-variant="homePaletteVariant" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { standalonePages } from '../../site-pages';

const HomeIsaure = defineAsyncComponent(() => import('@/components/HomeIsaure.vue'));
const { isDark } = useSiteTheme();
const { isSunPalette } = useSitePalette();
const homePaletteVariant = computed(() => (isSunPalette.value ? 'sun' : 'default'));

usePageSeo(standalonePages.home);
</script>
