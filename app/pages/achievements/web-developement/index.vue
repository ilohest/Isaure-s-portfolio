<template>
  <WebDevelopement />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { standalonePages } from '../../../../site-pages';

const WebDevelopement = defineAsyncComponent(() => import('@/components/WebDevelopement.vue'));

usePageSeo(standalonePages.achievementsWeb);
</script>
