<template>
  <Achievements />
</template>

<script setup lang="ts">
import Achievements from '@/components/Achievements.vue';
import { standalonePages } from '../../../site-pages';

usePageSeo(standalonePages.achievements);
</script>
