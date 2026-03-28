<script setup lang="ts">
import { computed } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';

type BreadcrumbItem = {
  label: string;
  url?: string;
};

const route = useRoute();

const home = computed<BreadcrumbItem>(() => ({
  label: 'Home',
  url: '/',
}));

const model = computed<BreadcrumbItem[]>(() => {
  const matched = route.matched.filter((r) => r.path !== '/' && r.meta?.breadcrumb !== null);

  return matched.map((r, idx, arr) => {
    const isLast = idx === arr.length - 1;

    const label = String(r.meta?.breadcrumb ?? r.meta?.title ?? r.name ?? '');

    const absPath =
      '/' +
      arr
        .slice(0, idx + 1)
        .map((x) => x.path.replace(/^\//, ''))
        .filter(Boolean)
        .join('/');

    if (isLast) {
      return { label };
    }

    if (r.name) {
      return { label, url: absPath };
    }

    return { label, url: absPath };
  });
});
</script>

<template>
  <Breadcrumb :home="home" :model="model" class="border-none p-0" />
</template>

<style>
.p-menuitem-text {
  font-family: var(--font-family-body);
  font-size: 0.95rem !important;
  font-weight: 300 !important;
  color: var(--interactive-primary);
}
.p-menuitem-separator {
  color: var(--accent-positive);
}
.p-breadcrumb {
  background: none;
}
.p-breadcrumb .p-menuitem-link:hover {
  text-decoration: underline;
}
.p-breadcrumb .p-breadcrumb-chevron {
  margin: 0 0.5rem;
}
</style>
