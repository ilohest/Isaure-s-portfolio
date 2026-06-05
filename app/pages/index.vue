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

// Match Safari browser chrome to the homepage hero background.
// Default palette = blue accent; sun palette = warm yellow.
const themeColor = useThemeColor();
themeColor.value = isSunPalette.value ? '#fff47a' : '#4c5ef7';

watch(isSunPalette, (sun) => {
  themeColor.value = sun ? '#fff47a' : '#4c5ef7';
});

onUnmounted(() => {
  themeColor.value = '#f8f8f6'; // reset when leaving homepage
});
</script>
