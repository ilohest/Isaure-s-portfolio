<template>
  <Inspo2026 :is-dark="isDark" />
</template>

<script setup lang="ts">
import Inspo2026 from '@/components/Inspo2026.vue';
import { standalonePages } from '../../site-pages';

const runtimeConfig = useRuntimeConfig();
const { isDark } = useSiteTheme();
const isInspo2026Enabled = runtimeConfig.public.isInspo2026Enabled !== false;

if (!isInspo2026Enabled) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

usePageSeo(standalonePages.inspo2026);
</script>
