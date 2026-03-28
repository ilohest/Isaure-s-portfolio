<template>
  <BrandingPage />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { standalonePages } from '../../../../site-pages';

const BrandingPage = defineAsyncComponent(() => import('@/components/branding.vue'));

usePageSeo(standalonePages.achievementsBranding);
</script>
