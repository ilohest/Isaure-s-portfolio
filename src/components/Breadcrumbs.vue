<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';

const route = useRoute();

const home = {
  label: 'Home',
  to: { name: 'home-isaure' }, // ou command: () => router.push({ name: 'home-isaure' })
};

const model = computed(() => {
  const matched = route.matched.filter((r) => r.path !== '/');

  return (
    matched
      // 1) On ne garde que les routes qui ont un breadcrumb défini (non null/undefined/empty)
      .filter((r) => r.meta && r.meta.breadcrumb)
      // 2) On mappe avec navigation sur tous sauf le dernier
      .map((r, idx, arr) => {
        const isLast = idx === arr.length - 1;
        const label =
          typeof r.meta.breadcrumb === 'function' ? r.meta.breadcrumb(route) : r.meta.breadcrumb;

        return {
          label,
          ...(isLast
            ? {}
            : { to: { name: r.name || undefined, params: route.params, query: route.query } }),
        };
      })
  );
});
</script>

<template>
  <Breadcrumb :home="home" :model="model" class="border-none p-0" />
</template>

<style>
.p-menuitem-text {
  font-family: 'Red Hat Text', sans-serif;
  font-size: 0.95rem !important;
  font-weight: 300 !important;
  color: var(--red);
}
.p-menuitem-separator {
  color: var(--brat);
}
.p-breadcrumb .p-menuitem-link:hover {
  text-decoration: underline;
}
.p-breadcrumb .p-breadcrumb-chevron {
  margin: 0 0.5rem;
}
</style>
