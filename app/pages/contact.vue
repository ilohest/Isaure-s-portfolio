<template>
  <ContactIsaure :is-dark="isDark" />
</template>

<script setup lang="ts">
import ContactIsaure from '@/components/ContactIsaure.vue';
import { standalonePages } from '../../site-pages';

const { isDark } = useSiteTheme();

usePageSeo(standalonePages.contact);
</script>
