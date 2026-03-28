<template>
  <HomeIsaure :is-dark="isDark" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { standalonePages } from '../../site-pages';

const HomeIsaure = defineAsyncComponent(() => import('@/components/HomeIsaure.vue'));
const { isDark } = useSiteTheme();

usePageSeo(standalonePages.home);
</script>
