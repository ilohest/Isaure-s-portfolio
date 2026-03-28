<template>
  <NotFoundPage />
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import NotFoundPage from '@/components/NotFound.vue';

defineProps<{
  error: NuxtError;
}>();

usePageSeo({
  title: 'Not found — Isaure Lohest',
  description: 'The requested page could not be found.',
  robots: 'noindex, nofollow',
});
</script>
