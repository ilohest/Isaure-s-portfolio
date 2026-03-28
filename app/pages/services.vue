<template>
  <MyServices />
</template>

<script setup lang="ts">
import MyServices from '@/components/MyServices.vue';
import { standalonePages } from '../../site-pages';

usePageSeo(standalonePages.services);
</script>
