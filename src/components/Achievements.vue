<!-- src/components/Achievements.vue -->
<template>
  <section class="mx-auto px-4 py-4 md:px-6 md:py-8">
    <!-- hero -->
    <header class="mb-6 text-center md:mb-8">
      <h1 class="anton-regular text-3xl text-[var(--red)] uppercase md:text-4xl">Achievements</h1>
      <p class="mt-2 text-[var(--light-content)]">
        A selection of client work across web development and branding.
      </p>
    </header>

    <!-- contrôles -->
    <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <!-- Catégories -->
      <div class="flex items-center gap-2">
        <SelectButton
          v-model="cat"
          :options="catOptions"
          option-label="label"
          option-value="value"
          :unselectable="false"
        />
      </div>

      <!-- <Dropdown
        v-model="sort"
        :options="sortOptions"
        option-label="label"
        option-value="value"
        placeholder="Sort by"
        class="min-w-56"
      /> -->
    </div>

    <!-- grille (alignée sur WebDevelopement.vue) -->
    <div class="gallery">
      <div v-for="p in filtered" :key="p.id" class="gallery-item project-card">
        <router-link :to="p.to" class="item-link">
          <Card class="border-round-xl h-full overflow-hidden">
            <template #content>
              <div class="relative">
                <img
                  :src="p.placeholder"
                  :alt="`Image of ${p.title}`"
                  class="aspect-square w-full object-cover"
                />
                <div class="project-info">
                  <span>{{ p.title }}</span>
                  <span>{{ p.year }}</span>
                </div>
              </div>
            </template>
          </Card>
        </router-link>
      </div>
    </div>

    <router-view />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import Card from 'primevue/card';
// import Dropdown from 'primevue/dropdown';
import SelectButton from 'primevue/selectbutton';

import webdev from '@/web-dev-projects.js';
import branding from '@/branding-projects.js';

// Normalisation des données
// Normalisation des données
const webItems = webdev.map((x) => ({
  id: `web-${x.id}`,
  title: x.title,
  year: x.year,
  order: Number(x.order ?? `${x.year}00`), // <= garder et forcer en nombre
  placeholder: x.placeholder,
  to: x.projectLink,
  category: 'web',
}));

const brandItems = branding.map((x) => ({
  id: `brand-${x.id}`,
  title: x.title,
  year: x.year,
  order: Number(x.order ?? `${x.year}00`), // <= idem
  placeholder: x.placeholder,
  to: x.projectLink,
  category: 'branding',
}));

const all = [...webItems, ...brandItems];

// UI state
const cat = ref('all'); // all | web | branding
const q = ref('');
const sort = ref('year-desc');

// PrimeVue options
const catOptions = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Branding', value: 'branding' },
];

// const sortOptions = [
//   { label: 'Newest first', value: 'year-desc' },
//   { label: 'Oldest first', value: 'year-asc' },
//   { label: 'Title A–Z', value: 'title-asc' },
//   { label: 'Title Z–A', value: 'title-desc' },
// ];

const filtered = computed(() => {
  let arr = all;

  if (cat.value !== 'all') {
    arr = arr.filter((p) => p.category === cat.value);
  }

  if (q.value.trim()) {
    const s = q.value.trim().toLowerCase();
    arr = arr.filter((p) => p.title.toLowerCase().includes(s) || String(p.year).includes(s));
  }

  switch (sort.value) {
    case 'year-asc':
      return [...arr].sort((a, b) => a.order - b.order); // plus ancien -> plus récent
    case 'title-asc':
      return [...arr].sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return [...arr].sort((a, b) => b.title.localeCompare(a.title));
    default: // 'year-desc' (défaut): plus récent en haut
      return [...arr].sort((a, b) => b.order - a.order);
  }
});
</script>

<style scoped>
/* Grille identique à WebDevelopement.vue */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Effet overlay et info centrée (reprend la logique WebDevelopement.vue) */
.project-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 36%;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition:
    background-color 0.5s ease,
    opacity 0.5s ease;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}
.project-card:hover::before {
  opacity: 1;
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: 100%;
}

.project-info {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0s,
    opacity 0.5s linear;
  z-index: 2;
  color: var(--red-bg);
  text-transform: uppercase;
  text-align: center;
  font-size: var(--fs-16);
}
.project-card:hover .project-info {
  visibility: visible;
  opacity: 1;
}

/* Responsive aligné avec ton autre composant */
@media screen and (max-width: 970px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .project-info {
    visibility: visible;
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 10px;
    color: var(--red-bg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 68vw;
  }
}

@media screen and (max-width: 628px) {
  .gallery {
    grid-template-columns: 1fr;
    margin-bottom: 80px;
  }
  .project-card::before {
    display: none;
  }
}

:deep(.p-selectbutton .p-button:focus),
:deep(.p-selectbutton .p-button:focus-visible),
:deep(.p-selectbutton .p-button.p-focus) {
  box-shadow: none !important;
  outline: 0 !important;
}
/* Centrer le label dans l'input du Dropdown (champ fermé) */
:deep(.p-dropdown) {
  display: inline-flex; /* PrimeVue le fait déjà, on sécurise */
  align-items: center;
}
:deep(.p-dropdown .p-dropdown-label) {
  flex: 1 1 auto !important; /* occupe l'espace dispo */
  text-align: center !important; /* centre le texte */
  width: auto !important; /* évite les surprises */
  padding-left: 15px; /* optionnel: enlève le décalage à gauche */
}

/* Centrer aussi les éléments dans le panneau (liste ouverte) */
:deep(.p-dropdown-panel .p-dropdown-items) {
  text-align: center;
}
:deep(.p-dropdown-panel .p-dropdown-item) {
  justify-content: center; /* si l'item est en flex dans ton thème */
}
</style>
