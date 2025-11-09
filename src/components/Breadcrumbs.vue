<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';

const route = useRoute();
const router = useRouter();

// Home en URL absolue
const home = computed(() => ({
  label: 'Home',
  url: router.resolve({ name: 'home-isaure' }).href,
}));

const model = computed(() => {
  const matched = route.matched.filter((r) => r.path !== '/' && r.meta?.breadcrumb !== null);

  return matched.map((r, idx, arr) => {
    const isLast = idx === arr.length - 1;

    const label =
      typeof r.meta?.breadcrumb === 'function'
        ? r.meta.breadcrumb(route)
        : (r.meta?.breadcrumb ?? r.meta?.title ?? r.name ?? '');

    if (isLast) {
      return { label }; // dernier: pas de lien
    }

    // 1) si on a un name, on résout vers une URL absolue
    if (r.name) {
      return { label, url: router.resolve({ name: r.name }).href };
    }

    // 2) fallback rare: construire un path absolu depuis les parents
    const absPath =
      '/' +
      arr
        .slice(0, idx + 1)
        .map((x) => x.path.replace(/^\//, ''))
        .filter(Boolean)
        .join('/');

    return { label, url: absPath };
  });
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
