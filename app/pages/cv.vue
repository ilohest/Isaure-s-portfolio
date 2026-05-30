<template>
  <div class="cv-route">
    <iframe
      class="cv-route__frame"
      src="/cv-isaure-lohest.html"
      title="CV Isaure Lohest d'Hooghvorst"
    />
  </div>
</template>

<script setup lang="ts">
import { standalonePages } from '../../site-pages';

definePageMeta({
  layout: false,
});

usePageSeo(standalonePages.cv);
</script>

<style scoped>
.cv-route {
  width: 100%;
  min-height: 100vh;
  background: #faf9f5;
}

.cv-route__frame {
  display: block;
  width: 100%;
  height: 100vh;
  border: 0;
  background: #faf9f5;
}
</style>
