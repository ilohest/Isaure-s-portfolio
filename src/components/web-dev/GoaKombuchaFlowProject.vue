<template>
  <section class="relative container mx-auto flex flex-col gap-4 px-4 py-4">
    <div class="flex items-center justify-between">
      <Button
        label="Back to projects"
        icon="pi pi-arrow-left"
        text
        class="btn-link"
        @click="$router.push('/achievements')"
      />
    </div>

    <Card
      class="project-summary-card bg-[var(--surface-muted)] text-[var(--text-secondary)] shadow-none"
    >
      <template #content>
        <div class="flex flex-col gap-5 p-4 md:p-6">
          <h2 class="font-display m-0 text-4xl uppercase">Goa Kombucha Flow</h2>

          <div class="font-['Red_Hat_Text'] font-light">
            <p>
              Goa Kombucha Flow is a mobile-first production platform created to migrate the
              client’s operational spreadsheets into a practical web app that can be used directly
              from a phone in the production area.
            </p>
            <p class="mt-4">
              The goal was to make recipe management, batch tracking, stock control, and production
              decisions easier to handle on the floor: fewer scattered files, less back-and-forth,
              and a clearer workflow for preparing, following, duplicating, and documenting batches.
            </p>
            <p class="mt-4">
              The app centralizes product formulas, active productions, lot history, ingredient
              stock, deliveries, and PDF exports in one interface designed around the constraints of
              real production use: quick checks, readable screens, and reliable access from a
              mobile device.
            </p>
            <p class="mt-4">
              Because the platform handles confidential recipes, quantities, prices, and supplier
              information, the case-study screens shown here are intentionally anonymized while
              preserving the structure and workflow of the interface.
            </p>
          </div>

          <div>
            <h2 class="mb-3 text-xl tracking-wide uppercase">Key features</h2>
            <ul class="feature-list font-['Red_Hat_Text'] font-light">
              <li>Mobile production dashboard with active batches, status steps, and stock alerts</li>
              <li>Recipe library with product versions, ingredient logic, and batch calculations</li>
              <li>Lot creation, duplication, history, notes, and production PDF export</li>
              <li>Inventory views for ingredients, critical thresholds, deliveries, and order needs</li>
              <li>Operational tracking for measurements, starter, water, filtration, and bottling</li>
            </ul>
          </div>
        </div>
      </template>
    </Card>

    <div class="project-screens mt-4">
      <img
        v-for="image in images"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        class="project-screen"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="mt-6 mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2">
      <Button
        v-if="hasPrevProject"
        label="Previous"
        icon="pi pi-arrow-left"
        class="p-button-outlined"
        @click="navigateTo(prevProject)"
      />

      <span class="text-xl font-semibold uppercase">{{ current.title }}</span>

      <Button
        v-if="hasNextProject"
        label="Next"
        class="p-button-outlined"
        icon-pos="right"
        icon="pi pi-arrow-right"
        @click="navigateTo(nextProject)"
      />
    </div>

    <div class="h-24 flex-none"></div>
  </section>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import projects from '@/web-dev-projects';
import allProjects from '@/all-projects';

const imageBase = '/assets/media/projects/web-dev/goa-kombucha-flow';

const images = [
  ['goa-kombucha-flow-01-dashboard.webp', 'Goa Kombucha lot history'],
  ['goa-kombucha-flow-03-production-detail.webp', 'Goa Kombucha stock item settings'],
  ['goa-kombucha-flow-04-lot-history.webp', 'Goa Kombucha stock overview'],
  ['goa-kombucha-flow-05-lot-export.webp', 'Goa Kombucha completed lot details'],
  ['goa-kombucha-flow-06-deliveries.webp', 'Goa Kombucha deliveries screen'],
  ['goa-kombucha-flow-07-stock.webp', 'Goa Kombucha production details'],
  ['goa-kombucha-flow-08-stock-item.webp', 'Goa Kombucha mobile dashboard'],
  ['goa-kombucha-flow-09-pdf.webp', 'Goa Kombucha recipe library'],
  ['goa-kombucha-flow-02-recipes.webp', 'Goa Kombucha PDF recipe export'],
].map(([filename, alt]) => ({
  src: `${imageBase}/${filename}`,
  alt,
}));

export default {
  name: 'GoaKombuchaFlowProject',
  components: { Card, Button },
  data() {
    return {
      projects,
      images,
    };
  },
  computed: {
    currentIndex() {
      const path = this.$route?.path || '';
      const idx = this.projects.findIndex((p) => p.projectLink === path);
      return idx === -1 ? 0 : idx;
    },
    current() {
      return this.projects[this.currentIndex] || this.projects[0];
    },
    navProjects() {
      return [...allProjects].sort((a, b) => a.order - b.order);
    },
    navCurrentIndex() {
      const idx = this.navProjects.findIndex((p) => p.projectLink === this.current?.projectLink);
      return idx === -1 ? 0 : idx;
    },
    hasPrevProject() {
      return this.navProjects.length > 1 && this.navCurrentIndex > 0;
    },
    hasNextProject() {
      return this.navProjects.length > 1 && this.navCurrentIndex < this.navProjects.length - 1;
    },
    prevProject() {
      return this.hasPrevProject ? this.navProjects[this.navCurrentIndex - 1] : this.current;
    },
    nextProject() {
      return this.hasNextProject ? this.navProjects[this.navCurrentIndex + 1] : this.current;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    navigateTo(project) {
      if (project?.projectLink) this.$router.push(project.projectLink);
    },
  },
};
</script>

<style scoped>
.feature-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1.2rem;
}

.project-screens {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1.25rem;
  align-items: start;
}

.project-screen {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--interactive-primary);
  border-radius: 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}
</style>
